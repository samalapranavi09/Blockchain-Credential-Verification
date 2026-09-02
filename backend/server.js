const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const credentialRoutes = require("./routes/credentialRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Blockchain Credential Verification API is running"
  });
});

// Credential API Routes
app.use("/api/credentials", credentialRoutes);

// Start Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});