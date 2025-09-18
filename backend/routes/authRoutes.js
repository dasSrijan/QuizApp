const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Signup route with password hashing
router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      age,
      dob
    } = req.body;

    // Check required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !gender || !age || !dob) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      age,
      dob
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login route (from before)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "yoursecretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET || "yoursecretkey",
//       { expiresIn: "1h" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email
//       }
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
