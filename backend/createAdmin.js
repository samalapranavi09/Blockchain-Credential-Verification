require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@university.edu";
    const password = "Admin@12345";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Admin account already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "University Admin",
      email,
      password: hashedPassword,
      role: "Admin"
    });

    console.log("Admin account created successfully.");
    console.log("Email:", email);
    console.log("Password: Admin@12345");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();