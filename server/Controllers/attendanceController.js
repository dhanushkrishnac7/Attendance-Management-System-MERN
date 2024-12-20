const student = require("../Models/Student")
const classroom = require("../Models/class")
const admmin = require("../Models/admin")
const asynchandler = require("express-async-handler");
const admin = require("../Models/admin");

const today = new Date();
const date = today.toISOString().split('T')[0];

const getStudents = asynchandler(async(req,res)=>{
    const {department,section} = req.query;
    const requestedDate = req.body.date;
    if(req.user.role!=="masteradmin"&&!department){
        res.status(403);
        throw new Error("department of the students is required")
    }
    if(req.user.role==="Admin"&&!section){
        res.status(403);
        throw new Error("section of the students is required")
    }
    if(req.user.role!=="masteradmin"&&req.user.department!==department){
        res.status(401);
        throw new Error("Access denied")
    }
    const query = {}
    if(department){
        query.department = department;
    }
    if(section){
        query.section = section;
    }
    const students = await student.find(query);
    if(!students){
        return res.status(404).json({message : "No Students Found"});
    }
    const present = [],absent = [];
    for(const studentIterator of students){
        if(studentIterator.absentdays.includes(requestedDate)){
            absent.push(studentIterator.rollno);
        }else{
            present.push(studentIterator.rollno);
        }
    }
    res.status(200).json({students,present,absent});
})

const updateStudentAttendance = asynchandler(async(rollno,isPresent)=>{
    const member = await student.findOne({rollno});
    if(!member){
        res.status(404);
        throw new Error("Student Not Found");
    }

    if(member.presentdays.length>0&&member.presentdays[member.presentdays.length-1]===date){
        member.presentdays.pop();
    }
    if(member.absentdays.length&&member.absentdays[member.absentdays.length-1]===date){
        member.absentdays.pop();
    }

    if(isPresent){
        member.presentdays.push(date);
    }else{
        member.absentdays.push(date);
    }
    await member.save();
})

const addAttendance = asynchandler(async(req,res)=>{
    const {department,section} = req.query
    const { present, absent } = req.body;
    
    if (Array.isArray(present)) {
        for (const rollno of present) {
            updateStudentAttendance(rollno,true);
        }
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
    
    
    if (Array.isArray(absent)) {
        for (const rollno of absent) {
            updateStudentAttendance(rollno,false);
        }
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }

    const class1 = await classroom.findOne({department,section});

    if(!class1){
        res.status(404);
        throw new Error("Class Not Found")
    }
    class1.attendancetaken = class1.attendancetaken.filter((d)=>d!==date)
    class1.attendancetaken.push(date); 
    res.status(200).json({ message: "Attendance added successfully." });
})


module.exports = {addAttendance,getStudents};