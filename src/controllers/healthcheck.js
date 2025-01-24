import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken,generateRefreshToken } from "../utils/Tokens.js";
import jwt from "jsonwebtoken";


const healthCheck=asyncHandler(async (req,res)=>
{
   { 
    
    return res.status(200).
    json(new ApiResponse(200,"Ok","Health Check Passed"));
}

})

const errorCheck=asyncHandler(async (req,res)=>
{
    throw new Error("Something went wrong!");
})
const user={
    username:"admin",
    password:"123"
 
}
const loginUser=asyncHandler(async (req,res)=>
{
    // console.log("hai");
    const accessToken=generateAccessToken(user);
    const refreshToken=generateRefreshToken(user);
    return res.status(200).json(new ApiResponse(200,{accessToken:accessToken, refreshToken:refreshToken},"sucess"));

})

const checkTokens=asyncHandler(async (req,res)=>
{
    console.log(req.user);
    return res.status(200).json(new ApiResponse(200,"Ok","sucess"));
})

const refreshToken=asyncHandler(async (req,res)=>
{
    const {refreshToken}=req.body;
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken(user);
    return res.status(200).json(new ApiResponse(200,{accessToken:newAccessToken},"sucess"));
})


export {healthCheck,errorCheck,loginUser,checkTokens,refreshToken}