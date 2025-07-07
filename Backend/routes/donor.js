const express = require("express");
const Donor = require("../models/Donor");
const User = require("../models/User");
const router = express.Router();
const { checkForAuthenticationCookie } = require("../middleware/token-auth");

// Register as a donor
router.post("/register", checkForAuthenticationCookie("token"), async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Token missing or invalid." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingDonor = await Donor.findOne({
      user: userId,
      status: { $ne: "approved" },
    });

    if (existingDonor) {
      return res.status(400).json({ message: "You are already registered as a donor" });
    }

    const newDonor = new Donor({ user: userId });
    await newDonor.save();

    return res.status(201).json({
      message: "Registered as donor successfully",
      donor: newDonor,
    });
  } catch (error) {
    console.error("Donor registration error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});
// Get logged-in user's donor profile
router.get("/profile", checkForAuthenticationCookie("token"), async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const donations = await Donor.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const Patient = require("../models/Patient");
// Get a specific donor by ID
router.get("/:id", checkForAuthenticationCookie("token"), async (req, res) => {
  const { id } = req.params;

  try {
    const donor = await Donor.findById(id)
      .populate("user", "name email bloodGroup phone")
;

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    const patient = await Patient.findById(donor.patient)
    res.status(200).json({donor,patient});
  } catch (error) {
    console.error("Error fetching donor:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
