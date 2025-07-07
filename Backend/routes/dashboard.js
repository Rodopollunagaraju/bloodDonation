const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Donor = require("../models/Donor");
const Patient = require("../models/Patient");

router.get("/", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.user._id).select("-password");
    const donations = await Donor.find({ user: req.user._id }).populate("user", "name email bloodGroup");
    const requests = await Patient.find({ user: req.user._id });

    res.json({ user, donations, requests });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
