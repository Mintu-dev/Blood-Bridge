import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const Token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
        console.log("Token:", Token);
    if (!Token) {
      throw new ApiError(401, "Unauthorized request");
    }
console.log("Secret:", process.env.ACCESS_TOKEN_SECRET);
    const decodedToken = jwt.verify(
      Token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id)
      .select("-password -RefreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid AccessToken");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "JWT verification failed");
  }
});