const Credential = require("../models/Credential");
const crypto = require("crypto");

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
    const existingCredential = await Credential.findOne({ credentialId });

    if (existingCredential) {
      return res.status(400).json({
        success: false,
        message: "Credential ID already exists"
      });
    }

    // Generate SHA-256 hash automatically
    const generatedHash = generateCredentialHash({
      credentialId,
      studentName,
      rollNumber,
      degree,
      department,
      institution,
      issueDate
    });

    // Create and save the credential
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

    res.status(201).json({
      success: true,
      message: "Credential issued successfully",
      credential
    });

  } catch (error) {
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
    const credentials = await Credential.find().sort({ createdAt: -1 });

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
    const totalCredentials = await Credential.countDocuments();

    const validCredentials = await Credential.countDocuments({
      status: "Valid"
    });

    const revokedCredentials = await Credential.countDocuments({
      status: "Revoked"
    });

    const confirmedOnBlockchain = await Credential.countDocuments({
      blockchainStatus: "Confirmed"
    });

    const pendingBlockchain = await Credential.countDocuments({
      blockchainStatus: "Pending"
    });

    const recentCredentials = await Credential.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "credentialId studentName rollNumber degree department institution issueDate status blockchainStatus createdAt"
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
// VERIFY A CREDENTIAL BY ID + CHECK INTEGRITY
// GET /api/credentials/:credentialId
// ==========================================
const verifyCredential = async (req, res) => {
  try {
    const credential = await Credential.findOne({
      credentialId: req.params.credentialId
    });

    if (!credential) {
      return res.status(404).json({
        success: false,
        verified: false,
        integrityVerified: false,
        message: "Credential not found"
      });
    }

    // Check whether credential was revoked
    if (credential.status === "Revoked") {
      return res.status(200).json({
        success: true,
        verified: false,
        integrityVerified: false,
        message: "This credential has been revoked",
        credential
      });
    }

    // Generate hash again from the current stored data
    const currentHash = generateCredentialHash(credential);

    // Compare with the original hash
    const integrityVerified =
      currentHash === credential.certificateHash;

    // If hashes don't match, the credential data may have been changed
    if (!integrityVerified) {
      return res.status(200).json({
        success: true,
        verified: false,
        integrityVerified: false,
        message:
          "Credential integrity check failed. Data may have been modified.",
        credential
      });
    }

    // Credential is valid and unchanged
    res.status(200).json({
      success: true,
      verified: true,
      integrityVerified: true,
      message:
        "Credential verified successfully. Integrity check passed.",
      credential
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      verified: false,
      integrityVerified: false,
      message: "Verification failed",
      error: error.message
    });
  }
};


module.exports = {
  createCredential,
  getCredentials,
  getCredentialStats,
  verifyCredential
};