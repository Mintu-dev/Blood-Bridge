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
    anyMedicalConditions,
  } = req.body;

  // Check existing donor
  const existingDonor = await Donar.findOne({ email });
  if (existingDonor) {
    return res
      .status(409)
      .json({ message: "Donor already exists!", success: false });
  }

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
    anyMedicalConditions,
    user: req.user._id,
  });

  if (!newDonor) {
    return res
      .status(500)
      .json({ message: "Failed to register donor", success: false });
  }

  return res.status(201).json({
    message: "Donor registered successfully",
    success: true,
    newDonor,
  });
});

const getDonar = asyncHandler(async (req, res) => {
  const donar = await Donar.find();
  if (!donar) {
    throw new ApiError(404, "No donar found!");
  }

  return res.status(201).json(new ApiResponse(200, donar));
});
const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const searchType = asyncHandler(async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(200).json([]);
  }

  const safeLocation = escapeRegex(location);
  const find = await Donar.find({
    $or: [
      { "address.city": { $regex: safeLocation, $options: "i" } },
      { "address.street": { $regex: safeLocation, $options: "i" } },
      { "address.state": { $regex: safeLocation, $options: "i" } },
      { "address.pincode": { $regex: safeLocation, $options: "i" } },
    ],
  });
  return res.status(200).json(find);
});

export { registerDonor, getDonar, searchType };
