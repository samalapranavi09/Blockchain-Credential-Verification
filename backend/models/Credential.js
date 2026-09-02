const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema(
  {
    credentialId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    studentName: {
      type: String,
      required: true,
      trim: true
    },

    rollNumber: {
      type: String,
      required: true,
      trim: true
    },

    degree: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    institution: {
      type: String,
      required: true
    },

    issueDate: {
      type: Date,
      required: true
    },

    certificateHash: {
      type: String,
      required: true
    },

    blockchainStatus: {
      type: String,
      default: "Pending"
    },

    transactionHash: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["Valid", "Revoked"],
      default: "Valid"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Credential", credentialSchema);