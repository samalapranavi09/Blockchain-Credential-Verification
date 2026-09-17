const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ===============================
// LOGIN USER
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};


// ===============================
// CHANGE PASSWORD
// ===============================
const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;

    // Validate fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required"
      });
    }

    // Minimum password length
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "New password must contain at least 8 characters"
      });
    }

    // Find logged-in user
    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check current password
    const passwordCorrect =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        message:
          "Current password is incorrect"
      });
    }

    // Prevent same password
    const samePassword =
      await bcrypt.compare(
        newPassword,
        user.password
      );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be different from current password"
      });
    }

    // Hash new password
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password changed successfully"
    });
  } catch (error) {
    console.error(
      "Change Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while changing password"
    });
  }
};


// ===============================
// EXPORT CONTROLLERS
// ===============================
module.exports = {
  loginUser,
  changePassword
};