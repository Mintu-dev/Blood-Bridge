import mongoose from "mongoose";
import dotenv from "dotenv";
import Donar from "./models/donar.model.js";

dotenv.config();

await mongoose.connect(process.env.DB_CONNECTION);

await Donar.insertMany([
  {
    fullName: "Priya Patel",
    email: "priya@test.com",
    phoneNumber: "9876543211",
    gender: "Female",
    dob: new Date("1998-08-20"),
    bloodGroup: "A+",
    address: {
      street: "Park Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    lastDonationDate: new Date("2024-02-01"),
    anyMedicalConditions: [],
    user: "6a2c5194cc42ee9ca1fabdf4",
  },
]);

console.log("Donors added!");
process.exit(0);
