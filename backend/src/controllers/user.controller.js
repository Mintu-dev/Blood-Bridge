import {asyncHandler} from  "../utils/AsyncHandler.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{

    const {fullname , email , bio , dob , gender, username,password} = req.body;

    if(!(fullname || email || username || password)){
        throw new ApiError(404 , "Fill all the details");
    }

    const existingUser = await User.findOne({
        $or:[{email} , {username}]
    });
    if(existingUser){
        throw new ApiError(400 , "User already exist")
    }

     const user = await User.create({
        fullname,
        email,
        bio,
        dob,
        gender,
        username,
        password
    })

    const newUser = await User.findById(user._id);
    if(!newUser){
        throw new ApiError(400 , "Error while registering the user!!")
    }

    return res
    .status(201)
    .json(new ApiResponse(201 , newUser , "Registered successfully!"));
})


export {registerUser}