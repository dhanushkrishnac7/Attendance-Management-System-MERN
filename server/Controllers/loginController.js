const bcrypt = require("bcrypt")
const asynchandler = require("express-async-handler")
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken")
const student = require("../Models/Student")
const admin = require("../Models/admin");
const { generateRefreshToken, generateAccessToken } = require("./tokenController");

const loginUser = asynchandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await student.findOne({ email }) || await admin.findOne({ email });
    if(!user){
        res.status(404);
        throw new Error("User Not Found");
    }
    const isvalid = await bcrypt.compare(password,user.password)
    if(!isvalid){
        res.status(400);
        throw new Error("Invalid credentials");
    }
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    });    
})

module.exports = {loginUser}