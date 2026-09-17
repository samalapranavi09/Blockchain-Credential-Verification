const express = require("express");

const {
  loginUser,
  changePassword
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// LOGIN
// ===============================
router.post(
  "/login",
  loginUser
);


// ===============================
// CHANGE PASSWORD
// ===============================
router.put(
  "/change-password",
  protect,
  changePassword
);


module.exports = router;