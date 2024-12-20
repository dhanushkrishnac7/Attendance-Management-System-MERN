const  asynchandler = require("express-async-handler")
const admin = require("../Models/admin")
const student = require("../Models/Student")
const bcrypt = require("bcrypt")
const registerStudent = asynchandler(async(req,res)=>{
    const {name,email,phoneno,password,rollno,department,section} = req.body;
    if(!name||!email||!phoneno||!password||!rollno||!department||!section){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const isExist = await admin.findOne({email})
    if(isExist){
        res.status(400)
        throw new Error("email already registered")
    }
    const isExist2 = await admin.findOne({rollno})
    if(isExist){
        res.status(400)
        throw new Error("rollno already registered")
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
    const isExist = await admin.findOne({email})
    if(isExist){
        res.status(400)
        throw new Error("email already registered")
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
    const isExist = await admin.findOne({email})
    if(isExist){
        res.status(400)
        throw new Error("email already registered")
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
    const {name,email,phoneno,password} = req.body;
    if(!name||!email||!phoneno||!password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const isExist = await admin.findOne({email})
    if(isExist){
        res.status(400)
        throw new Error("email already registered")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new admin({
        name,email,phoneno,password:hashedPassword,department,role:"masteradmin"
    })
    await user.save();
    res.status(201).json(user)
})

module.exports = {registerStudent,registerAdmin,registerSuperAdmin,registermasterAdmin}