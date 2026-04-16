import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  Profile,
  ChangePassword,
  EditFullName,
  EditBio,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  registerDonor,
  getDonar,
  searchType,
} from "../controllers/donor.controller.js";
import {registerValidation , loginValidation , donorValidation} from "../middleware/check.middleware.js";

const router = Router();

router.route("/register-user").post(registerValidation , registerUser);
router.route("/login-user").post(loginValidation , loginUser);
router.route("/register-Donar").post(donorValidation,registerDonor);
router.route("/all-donar").get( getDonar);
router.route("/search").get(searchType);
router.route("/logout").post(logoutUser);
router.route("/profile").get(verifyJWT, Profile);
router.route("/change-password").post(verifyJWT, ChangePassword);
router.route("/editfullname").post(verifyJWT, EditFullName);
router.route("/editbio").post(verifyJWT , EditBio);

export default router;
