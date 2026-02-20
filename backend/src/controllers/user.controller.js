import {asyncHandler} from  "../utils/AsyncHandler.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const generateAccessandRefreshTokens = async(userId)=>{
    try{
        const user = await User.findById(userId);
        const AccessToken = user.generateAccessToken();
        const RefreshToken = user.generateRefreshToken();

        user.RefreshToken = RefreshToken;

        await user.save({validateBeforeSave:false});

        return {AccessToken , RefreshToken};
    }
    catch(error){
        throw new ApiError(404 , "Fail to generate tokens!")
    }
}

const registerUser = asyncHandler(async (req,res)=>{

    const {fullname , email , bio , dob , gender, username,password} = req.body;
    console.log(req.body);

    if(!(fullname && email && username && password)){
        throw new ApiError(400 , "Fill all the details");
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

const loginUser = asyncHandler(async(req,res)=>{
    const {username , password} = req.body;
    if(!(username && password)){
        throw new ApiError(400 , "Both fields are required");
    }

    const user = await User.findOne({username});
    if(!user){
        throw new ApiError(404 , "Username not found!");
    }

    const isValid = await user.isPasswordCorrect(password);
    if(!isValid){
        throw new ApiError(401 , "Password is incorrect");
    }

    const {AccessToken , RefreshToken} = await generateAccessandRefreshTokens(user._id);
    //cookie bane ke liya frr se database se call krnege

    const loggedInUser = await User.findById(user._id).select("-password -RefreshToken");

    //we are stopping the user to edit cookies

    const option = {
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .cookie("AccessToken" , AccessToken , option)
    .cookie("RefreshToken" , RefreshToken , option)
    .json(
        new ApiResponse(200,
           { user:loggedInUser,AccessToken,RefreshToken}
           , "User login successfully"
        )
    )


})

const logoutUser = asyncHandler(async (req, res) => {
  //logout ke baad update kr rahe hai refreshToken ko
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        RefreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    },
  );
  //frontend se cookie edit na paiye || cookie security policy.
  let option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("AccessToken", option)
    .clearCookie("RefreshToken", option)
    .json(new ApiResponse(200, {}, "Logout Successfully"));
});


export {
    registerUser,
    loginUser,
    logoutUser,
}