const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const Donor = require("../models/Donor");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const { checkForAuthenticationCookie } = require("../middleware/token-auth");

// Twilio Setup
const twilioClient = twilio("AC4bd007d07e928cccf8cc1cf45dc541d5", "7819deb672ea57951fbf0ff9896f82f9");
const twilioPhone = "+19787362643"; // Your Twilio phone number

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rodopollunagaraju@gmail.com",       // Your Gmail
    pass: "iyctxjpzzcpamjuj"                   // App password
  }
});

// Route: Register a patient
router.post("/register", async (req, res) => {
  try {
    const newPatient = new Patient({
      ...req.body,
      user: req.user._id,
    });

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    console.error("Patient Register Error:", err);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// Route: Get patient by ID along with linked donor
router.get("/:id", checkForAuthenticationCookie("token"), async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId).populate("user", "-password");
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const donor = await Donor.findOne({ patient: patientId })
      .populate("user", "name age gender email bloodGroup phone location")
      .exec();

    res.status(200).json({ patient, donor });
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Server error while fetching patient" });
  }
});

// Route: Find nearest pending donors for a patient
router.get("/:id/nearest-donors", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("user");
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const coords = patient.location.coordinates;

    const nearbyUsers = await User.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: coords },
          $maxDistance: 50000, // 50km
        },
      },
    });

    const nearbyUserIds = nearbyUsers.map((user) => user._id);

    const nearbyDonors = await Donor.find({
      user: { $in: nearbyUserIds },
      status: "pending",
    }).populate("user");

    res.json({ nearestDonors: nearbyDonors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Route: Approve a donor for a patient (send notification)
router.put("/:id/approve", async (req, res) => {
  const patientId = req.params.id;
  const { donorId } = req.body;

  try {
    const patient = await Patient.findById(patientId).populate("user");
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const donor = await Donor.findById(donorId).populate("user");
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    // Update donor and patient records
    donor.status = "approved";
    donor.patient = patient._id;
    await donor.save();

    patient.status = "Fulfilled";
    await patient.save();

    // Compose notification messages
    const donorEmailText = `Hi ${donor.user.name},\n\nYou have been approved to donate blood to ${patient.user.name}.\n\nContact Patient:\nPhone: ${patient.user.phone}\nEmail: ${patient.user.email}\n\nThank you!`;
    const patientEmailText = `Hi ${patient.user.name},\n\nYour blood request has been fulfilled. Donor details:\n\nName: ${donor.user.name}\nPhone: ${donor.user.phone}\nEmail: ${donor.user.email}\n\nPlease contact them to proceed.`;

    // Send Emails
    await transporter.sendMail({
      from: "rodopollunagaraju@gmail.com",
      to: donor.user.email,
      subject: "You're Approved to Donate Blood",
      text: donorEmailText
    });

    await transporter.sendMail({
      from: "rodopollunagaraju@gmail.com",
      to: patient.user.email,
      subject: "Your Blood Request is Fulfilled",
      text: patientEmailText
    });

    const donorPhone = donor.user.phone.startsWith('+') ? donor.user.phone : `+91${donor.user.phone}`;
    const patientPhone = patient.user.phone.startsWith('+') ? patient.user.phone : `+91${patient.user.phone}`;
    
    // Send SMS to Donor
    // await twilioClient.messages.create({
    //   body: `Approved to donate to ${patient.user.name}. Contact: ${patient.user.phone}`,
    //   from: twilioPhone,
    //   to: donorPhone
    // });
    
    // // Send SMS to Patient
    // await twilioClient.messages.create({
    //   body: `Your donor is ${donor.user.name}. Contact: ${donor.user.phone}`,
    //   from: twilioPhone,
    //   to: patientPhone
    // });
    res.status(200).json({ message: "Donor approved, notifications sent", donor, patient });

  } catch (error) {
    console.error("Error approving donor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
