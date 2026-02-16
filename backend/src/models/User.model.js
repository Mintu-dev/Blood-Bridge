import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Minimum 6 character required"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "rather not to disclose"],
    },
    dob: {
      type: Date,
    },
    bio: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User" , UserSchema);

UserSchema.pre("Save" , async function(next){
    if(!this.isModified("password")) next();

    this.password = bcrypt.hash("this.password" , 10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password);
}
