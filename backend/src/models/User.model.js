import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken"
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
    username:{
      type:String,
      unique:true,
      required:true,
      lowercase:true,
    }
  },
  { timestamps: true },
);


UserSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password , 10);
     return;
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password);
}

UserSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id :this._id,
    email:this.email,
    fullname:this.fullname
  },
process.env.ACCESS_TOKEN_SECRET,
{
  expireIn:process.env.ACCESS_TOKEN_EXPIRY
})}

UserSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id:this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
  })}
  const User = mongoose.model("User" , UserSchema);
  export {User}


