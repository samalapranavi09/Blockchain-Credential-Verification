const express = require("express");

const {
  createCredential,
  getCredentials,
  getCredentialStats,
  verifyCredential
} = require("../controllers/credentialController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Issue a new credential
// 🔐 Admin only
router.post("/", protect, createCredential);

// Get all credentials
// 🔐 Admin only
router.get("/", protect, getCredentials);

// Get dashboard statistics
// 🔐 Admin only
// IMPORTANT: This must come before "/:credentialId"
router.get("/stats", protect, getCredentialStats);

// Verify a credential using Credential ID
// 🌍 Public - no login required
router.get("/:credentialId", verifyCredential);

module.exports = router;