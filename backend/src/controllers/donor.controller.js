import Donar from "../models/donar.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const registerDonor = asyncHandler(async (req, res) => {

  const {
    fullName,
    email,
    phoneNumber,
    gender,
    dob,
    bloodGroup,
    address,
    weight,
    height,
    lastDonationDate,
    anyMedicalConditions
  } = req.body;
  console.log("ha data aagya sara from se")

  // check existing donor
  const existingDonor = await Donar.findOne({ email });

  if (existingDonor) {
    throw new ApiError(400, "Donor already exists with this email");
  }

  // create donor
  const newDonor = await Donar.create({
    fullName,
    email,
    phoneNumber,
    gender,
    dob,
    bloodGroup,
    address,
    weight,
    height,
    lastDonationDate,
    anyMedicalConditions
  });

  if (!newDonor) {
    throw new ApiError(500, "Failed to register donor");
  }


  return res.status(201).json(
    new ApiResponse(
      201,
      newDonor,
      "Donor registered successfully"
    )
  );
});

const getDonar = asyncHandler(async(req,res)=>{
    const donar = await Donar.find()
    if(!donar){
      throw new ApiError(404 , "No donar found!");
    }

    return res
    .status(201)
    .json( new ApiResponse(200 , donar));
})

export { registerDonor , getDonar };