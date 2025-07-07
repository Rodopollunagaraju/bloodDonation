const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "done", "cancelled"],
      default: "pending",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming Patient is also a User
      default: null,
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
