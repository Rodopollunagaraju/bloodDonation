const express = require("express");
const User = require("../models/User.js");
const { createTokenForUser } = require("../services/authentication.js");

const router = express.Router();

router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0), // Expire the cookie immediately
  });

  res.json({ message: "Logged out successfully" });
});
// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = createTokenForUser(user);
    res.cookie("token", token, {
      httpOnly: true,     // Prevents access from JavaScript
      secure: false,      // Set `true` if using HTTPS
      sameSite: "lax",    // Helps with CORS
    });
    
    console.log(req.cookies)
    res.json({
      token,
      userId: user._id,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});
// Signup Route
router.post("/register", async (req, res) => {
  try {
    const { name, age, gender, email, password, phone, bloodGroup, placeName, coordinates } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone || !bloodGroup || !placeName || !coordinates) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate phone format
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number. Must be 10 digits." });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email or phone already exists" });
    }

    // Convert coordinates to [longitude, latitude] format
    const [longitude, latitude] = [parseFloat(coordinates.lng), parseFloat(coordinates.lat)];
    if (isNaN(longitude) || isNaN(latitude)) {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    const newUser = new User({
      name,
      age,
      gender,
      email,
      password,
      phone,
      bloodGroup,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
        placeName,
      },
    });

    await newUser.save();

    const token = createTokenForUser(newUser);
    res.cookie("token", token, {
      httpOnly: true,     // Prevents access from JavaScript
      secure: false,      
      sameSite: "lax",  
    });
    
    console.log(req.cookies)
    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
      name: newUser.name,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;