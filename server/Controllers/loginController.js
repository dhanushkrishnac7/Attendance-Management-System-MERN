const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const asynchandler = require("express-async-handler")
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken")
const student = require("../Models/Student")
const admin = require("../Models/admin")

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
    const token = jwt.sign(
        {
            id : user._id,
            role : user.role
        },
        process.env.JWT_SECRET,
        {expiresIn : "15m"}
    )
    res.status(200).json({
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    });    
})

const registerStudent = asynchandler(async(req,res)=>{
    const {name,email,phoneno,password,rollno,department,section} = req.body;
    if(!name||!email||!phoneno||!password||!rollno||!department||!section){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new student({
        name,email,phoneno,password:hashedPassword,rollno,department,section
    })
    await user.save();
    res.status(201).json(user)
})

const registerAdmin = asynchandler(async(req,res)=>{
    const {name,email,phoneno,password,department} = req.body;
    if(!name||!email||!phoneno||!password||!department){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new admin({
        name,email,phoneno,password:hashedPassword,department,role: "Admin"
    })
    await user.save(); 
    res.status(201).json(user)
})

const registerSuperAdmin = asynchandler(async(req,res)=>{
    const {name,email,phoneno,password,department} = req.body;
    if(!name||!email||!phoneno||!password||!department){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new admin({
        name,email,phoneno,password:hashedPassword,department,role:"Superadmin"
    })
    await user.save();
    res.status(201).json(user)
})

const registermasterAdmin = asynchandler(async(req,res)=>{
    const {name,email,phoneno,password,department} = req.body;
    if(!name||!email||!phoneno||!password||!department){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new admin({
        name,email,phoneno,password:hashedPassword,department,role:"masteradmin"
    })
    await user.save();
    res.status(201).json(user)
})

module.exports = {loginUser,registerStudent,registerAdmin,registerSuperAdmin,registermasterAdmin}