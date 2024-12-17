const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name of the student required"]
    },
    email : {
        type : String,
        unique : true,
        required : [true,"Name of the student required"]
    },
    phoneNo : {
        type : 
    }
})

module.exports = mongoose.model("Student",schema)