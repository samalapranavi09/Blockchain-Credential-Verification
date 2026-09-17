const Credential = require("../models/Credential");
const crypto = require("crypto");

const {
  storeCredentialOnBlockchain,
  verifyCredentialOnBlockchain
} = require("../services/blockchainService");

// ==========================================
// CREATE SHA-256 HASH FROM CREDENTIAL DETAILS
// ==========================================
const generateCredentialHash = (credentialData) => {
  // Convert the date into one consistent format
  const formattedIssueDate = credentialData.issueDate
    ? new Date(credentialData.issueDate).toISOString()
    : "";

  const data = JSON.stringify({
    credentialId: credentialData.credentialId,
    studentName: credentialData.studentName,
    rollNumber: credentialData.rollNumber,
    degree: credentialData.degree,
    department: credentialData.department,
    institution: credentialData.institution,
    issueDate: formattedIssueDate
  });

  return crypto
    .createHash("sha256")
    .update(data)
    .digest("hex");
};


// ==========================================
// ISSUE A NEW CREDENTIAL
// POST /api/credentials
// ==========================================
const createCredential = async (req, res) => {
  try {
    const {
      credentialId,
      studentName,
      rollNumber,
      degree,
      department,
      institution,
      issueDate
    } = req.body;

    // Check whether the Credential ID already exists
    const existingCredential = await Credential.findOne({
      credentialId
    });

    if (existingCredential) {
      return res.status(400).json({
        success: false,
        message: "Credential ID already exists"
      });
    }

    // Generate SHA-256 hash
    const generatedHash = generateCredentialHash({
      credentialId,
      studentName,
      rollNumber,
      degree,
      department,
      institution,
      issueDate
    });

    // ==========================================
    // SAVE CREDENTIAL IN MONGODB
    // ==========================================
    const credential = await Credential.create({
      credentialId,
      studentName,
      rollNumber,
      degree,
      department,
      institution,
      issueDate,
      certificateHash: generatedHash,
      blockchainStatus: "Pending",
      status: "Valid"
    });

    // ==========================================
    // STORE HASH ON POLYGON BLOCKCHAIN
    // ==========================================
    try {
      const blockchainResult =
        await storeCredentialOnBlockchain(
          credentialId,
          generatedHash
        );

      // Blockchain transaction successful
      credential.blockchainStatus = "Confirmed";

      // Use the existing transactionHash field
      credential.transactionHash =
        blockchainResult.transactionHash;

      await credential.save();

      console.log(
        `Credential ${credentialId} stored on blockchain`
      );

      console.log(
        `Transaction Hash: ${blockchainResult.transactionHash}`
      );

    } catch (blockchainError) {
      // Blockchain failed, but MongoDB credential remains valid
      console.error(
        "Blockchain storage failed:",
        blockchainError.message
      );

      credential.blockchainStatus = "Pending";

      await credential.save();
    }

    // ==========================================
    // SEND RESPONSE
    // ==========================================
    res.status(201).json({
      success: true,
      message: "Credential issued successfully",
      credential
    });

  } catch (error) {
    console.error(
      "Create Credential Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to issue credential",
      error: error.message
    });
  }
};


// ==========================================
// GET ALL CREDENTIALS
// GET /api/credentials
// ==========================================
const getCredentials = async (req, res) => {
  try {
    const credentials = await Credential.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: credentials.length,
      credentials
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch credentials",
      error: error.message
    });
  }
};


// ==========================================
// GET DASHBOARD STATISTICS
// GET /api/credentials/stats
// ==========================================
const getCredentialStats = async (req, res) => {
  try {
    const totalCredentials =
      await Credential.countDocuments();

    const validCredentials =
      await Credential.countDocuments({
        status: "Valid"
      });

    const revokedCredentials =
      await Credential.countDocuments({
        status: "Revoked"
      });

    const confirmedOnBlockchain =
      await Credential.countDocuments({
        blockchainStatus: "Confirmed"
      });

    const pendingBlockchain =
      await Credential.countDocuments({
        blockchainStatus: "Pending"
      });

    const recentCredentials =
      await Credential.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "credentialId studentName rollNumber degree department institution issueDate status blockchainStatus transactionHash createdAt"
        );

    res.status(200).json({
      success: true,

      stats: {
        totalCredentials,
        validCredentials,
        revokedCredentials,
        confirmedOnBlockchain,
        pendingBlockchain
      },

      recentCredentials
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message
    });
  }
};


// ==========================================
// VERIFY A CREDENTIAL
// + CHECK SHA-256 INTEGRITY
// + CHECK BLOCKCHAIN HASH
// GET /api/credentials/:credentialId
// ==========================================
const verifyCredential = async (req, res) => {
  try {

    // ==========================================
    // FIND CREDENTIAL IN MONGODB
    // ==========================================
    const credential = await Credential.findOne({
      credentialId: req.params.credentialId
    });

    if (!credential) {
      return res.status(404).json({
        success: false,
        verified: false,
        integrityVerified: false,
        blockchainVerified: false,
        message: "Credential not found"
      });
    }


    // ==========================================
    // CHECK IF REVOKED
    // ==========================================
    if (credential.status === "Revoked") {
      return res.status(200).json({
        success: true,
        verified: false,
        integrityVerified: false,
        blockchainVerified: false,
        message: "This credential has been revoked",
        credential
      });
    }


    // ==========================================
    // REGENERATE SHA-256 HASH
    // ==========================================
    const currentHash =
      generateCredentialHash(credential);


    // ==========================================
    // COMPARE WITH MONGODB HASH
    // ==========================================
    const integrityVerified =
      currentHash === credential.certificateHash;


    // ==========================================
    // IF MONGODB INTEGRITY FAILS
    // ==========================================
    if (!integrityVerified) {
      return res.status(200).json({
        success: true,
        verified: false,
        integrityVerified: false,
        blockchainVerified: false,
        message:
          "Credential integrity check failed. Data may have been modified.",
        credential
      });
    }


    // ==========================================
    // CHECK BLOCKCHAIN
    // ==========================================
    let blockchainVerified = false;
    let blockchainData = null;

    try {

      blockchainData =
        await verifyCredentialOnBlockchain(
          credential.credentialId
        );


      // Check whether credential exists on blockchain
      if (blockchainData.exists) {

        // Compare blockchain hash with MongoDB hash
        blockchainVerified =
          blockchainData.certificateHash ===
          credential.certificateHash;
      }

    } catch (blockchainError) {

      console.error(
        "Blockchain verification failed:",
        blockchainError.message
      );

      blockchainVerified = false;
    }


    // ==========================================
    // FINAL VERIFICATION RESULT
    // ==========================================
    const verified =
      integrityVerified &&
      blockchainVerified;


    if (!verified) {

      return res.status(200).json({
        success: true,
        verified: false,
        integrityVerified,
        blockchainVerified,
        message:
          "Credential verification failed. Blockchain data does not match.",
        credential,
        blockchainData
      });

    }


    // ==========================================
    // EVERYTHING MATCHES
    // ==========================================
    res.status(200).json({
      success: true,
      verified: true,
      integrityVerified: true,
      blockchainVerified: true,
      message:
        "Credential verified successfully. MongoDB and blockchain hashes match.",
      credential,
      blockchainData
    });

  } catch (error) {

    console.error(
      "Verification Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      verified: false,
      integrityVerified: false,
      blockchainVerified: false,
      message: "Verification failed",
      error: error.message
    });
  }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
  createCredential,
  getCredentials,
  getCredentialStats,
  verifyCredential
};