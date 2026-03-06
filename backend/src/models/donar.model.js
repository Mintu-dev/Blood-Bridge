import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  dob: { type: Date, required: true },
  bloodGroup: { 
    type: String, 
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true 
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  weight: { type: Number, required: true },
  lastDonationDate: { type: Date },
  anyMedicalConditions: [String],
  isEligible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Donor", donorSchema);