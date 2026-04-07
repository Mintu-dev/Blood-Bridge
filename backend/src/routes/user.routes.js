import {Router} from "express";
import {registerUser , loginUser , logoutUser} from "../controllers/user.controller.js";
import {verifyJWT} from  "../middleware/auth.middleware.js"
import {registerDonor , getDonar,searchType} from "../controllers/donor.controller.js";

const router = Router();

router.route("/register-user").post(registerUser);
router.route("/login-user").post(loginUser);
router.route("/logout-user").post( verifyJWT , logoutUser);
router.route("/register-Donar").post(registerDonor);
router.route("/all-donar").get(getDonar);
router.route("/search").get(searchType);


export default router;