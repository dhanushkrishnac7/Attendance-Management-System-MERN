const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const asynchandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const loginUser = asynchandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await mongoose.findOne({email})
    if(!user){
        res.status(404);
        throw new Error("User Not Found");
    }
    const isvalid = await bcrypt.compare(password,user.password)
    if(!isvalid){
        res.status(400);
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
        {
            id : user._id,
            role : user.role
        },
        process.env.JWT_SECRET,
        {expiresIn : "15m"}
    )
    res.status(201).json(token)
})

const registerStudent = asynchandler(async(req,res)=>{
    const {name,email,phoneno,password,rollno,department,section} = req.body;
    const user = await mongoose.create({
        name,email,phoneno,password,rollno,department,section
    })
    const token = jwt.sign(
        {
            id : user._id,
            role : user.role
        },
        process.env.JWT_SECRET,
        {expiresIn : "15m"}
    )
    res.status(201).json(user,token)
})

const registerAdmin = asynchandler(async(req,res)=>{
    const {name,email,phoneno,password,department} = req.body;
    const user = await mongoose.create({
        name,email,phoneno,password,department
    })
    const token = jwt.sign(
        {
            id : user._id,
            role : user.role
        },
        process.env.JWT_SECRET,
        {expiresIn : "15m"}
    )
    res.status(201).json(user,token)
})

module.exports = {loginUser,registerStudent,registerAdmin}