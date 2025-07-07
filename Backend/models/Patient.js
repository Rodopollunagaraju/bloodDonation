const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    forWhom: {
      type: String,
      enum: ["Self", "Family", "Other"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: true,
    },
    urgency: {
      type: String,
      enum: ["Urgent", "Normal"],
      default: "Normal",
    },
    reason: {
      type: String,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    location: {
      placeName: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Fulfilled", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);

module.exports = Patient;
