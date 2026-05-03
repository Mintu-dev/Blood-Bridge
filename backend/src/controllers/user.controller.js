import {asyncHandler} from "../utils/AsyncHandler.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import Message from "../models/chat.model.js";

const isProduction = process.env.NODE_ENV === 'production';

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
        return res.status(409).
        json({message:"All fields are required" , success:falsa})
    }
 

    const existingUser = await User.findOne({
        $or:[{email} , {username}]
    });
    if(existingUser){
       return res
       .status(409)
       .json({message:"User already exist" , success:false})
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
        return res
        .status(404)
        .json({message:"Error while registering" , success:falsa})
    }

    return res
    .status(201)
    .json({message:"Registered successfully" , success:true});
})

const loginUser = asyncHandler(async(req,res)=>{
    const {username , password , fullname} = req.body;
    if(!(username && password)){
        return res
        .status(409)
        .json({message:"Both field are required" , success:false});
    }

    const user = await User.findOne({username});
    if(!user){
        return res
        .status(409)
        .json({message:"Username not found!" , success:false});
    }

    const isValid = await user.isPasswordCorrect(password);
    if(!isValid){
        return res
        .status(409)
        .json({message:"Password is incorrect" , success:false});
    }

    const {AccessToken , RefreshToken} = await generateAccessandRefreshTokens(user._id);
    //cookie bane ke liya frr se database se call krnege

    const loggedInUser = await User.findById(user._id).select("-password -RefreshToken");

    //we are stopping the user to edit cookies

    
    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',          
        sameSite: 'none',                   // ✅ Cross-origin ke liye 'none'
        
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000     // 7 days
    };
    
    return res
        .status(200)
        .cookie("AccessToken", AccessToken, option)
        .cookie("RefreshToken", RefreshToken, option)
        .json({
            success: true,
            message: "User login successfully",
            user: loggedInUser,
        });


})

const logoutUser = asyncHandler(async (req, res) => {

  // Optional: refreshToken database se remove karna hai to userId check karo
  if (req.user?._id) {
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { RefreshToken: 1 } },
      { new: true }
    );
  }

  // Cookie options for localhost
const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: '/'
};

  res
    .status(200)
    .clearCookie("AccessToken", option)
    .clearCookie("RefreshToken", option)
    .json({ status: 200, message: "Logout Successfully" });
});

const Profile = asyncHandler(async(req,res)=>{
   res.status(200).json({user:req.user});
})

const ChangePassword = asyncHandler(async(req,res)=>{
    const {oldPassword , newPassword} = req.body;
    const user = await User.findById(req.user?._id);
    
    const correctPassword = await user.isPasswordCorrect(oldPassword);

     if(!correctPassword){
        throw new ApiError(401 , "Password is incorrect");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave:false});

    return res
    .status(201)
    .json(new ApiResponse(200 , {} , "Password Updated Successfully"))
})

const EditFullName = asyncHandler(async(req,res)=>{
    const {currentName , newName} = req.body;

    const user = await User.findById(req.user?._id);

    user.fullname = newName;
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(201 , {} , "Name Updated Successfully"));
})

const EditBio = asyncHandler(async(req,res)=>{
  const {bio} = req.body;

  const user = await User.findById(req.user?._id);
  user.bio = bio;
  await user.save({validateBeforeSave:false})

   return res
    .status(200)
    .json(new ApiResponse(200 , {} , "Bio Updated Successfully"));
  
})

// controllers/user.controller.js

const SendMsg = asyncHandler(async (req, res) => {
  const { receiverId, message } = req.body;

  if (!receiverId || !message) {
    throw new ApiError(400, "Missing fields");
  }

  const newMsg = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    message,
  });

  res.json(newMsg);
});

const GetMsg = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: userId },
      { sender: userId, receiver: req.user._id },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
});


const GetAllChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const messages = await Message.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .sort({ createdAt: -1 })
    .populate("sender", "fullname username")
    .populate("receiver", "fullname username");

  const map = new Map();

  messages.forEach((msg) => {
    const isSender = msg.sender._id.toString() === userId.toString();
    const otherUser = isSender ? msg.receiver : msg.sender;

    const key = otherUser._id.toString();

    if (!map.has(key)) {
      map.set(key, {
        _id: otherUser._id,
        fullname: otherUser.fullname,
        username: otherUser.username,
        lastMessage: msg.message, // ✅ FIXED
      });
    }
  });

  res.json([...map.values()]);
});

const GetUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  
  res.json({ user: { _id: user._id, fullname: user.fullname } });
});
export {
    registerUser,
    loginUser,
    GetUserByEmail,
    logoutUser,
    Profile,
    ChangePassword,
    EditFullName,
    EditBio,
    SendMsg,
    GetMsg,
    GetAllChats
}