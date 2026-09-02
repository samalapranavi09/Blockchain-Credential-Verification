const express = require("express");

const {
  createCredential,
  getCredentials,
  getCredentialStats,
  verifyCredential
} = require("../controllers/credentialController");

const router = express.Router();

// Issue a new credential
router.post("/", createCredential);

// Get all credentials
router.get("/", getCredentials);

// Get dashboard statistics
// IMPORTANT: This must come before "/:credentialId"
router.get("/stats", getCredentialStats);

// Verify a credential using Credential ID
router.get("/:credentialId", verifyCredential);

module.exports = router;