const mongoose = require('mongoose')
const asynchandler = require("express-async-handler")
const student = require('../Models/Student')

exports.attendanceRecord = asynchandler(async(req,res,next)=>{
    const {department,section} = req.query
    const record = req.body

    const present = record.present
    const absent = record.absent

    if (Array.isArray(present)) {
        for (const i of present) {
            const today = new Date();
            const date = today.toISOString().split('T')[0];
            const member = await student.findOne({department,section})
            member.presentdays.push(date)
        }
    } else {
        console.error("`present` is not an array");
    }
    
    
    if (Array.isArray(absent)) {
        for (const i of absent) {
            const today = new Date();
            const date = today.toISOString().split('T')[0];
            const member = await student.findOne({department,section})
            member.absentdays.push(date)
        }
    } else {
        console.error("`absent` is not an array");
    }
})
