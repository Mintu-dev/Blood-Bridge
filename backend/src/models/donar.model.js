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
    street: { type: String, required: true } ,
    city: { type: String, required: true }  ,
    state: { type: String, required: true }  ,
    pincode: { type: String, required: true }  ,
  },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },

  lastDonationDate: { type: Date  , required:true},
  anyMedicalConditions: [String] , 
}, { timestamps: true });

export default mongoose.model("Donor", donorSchema);