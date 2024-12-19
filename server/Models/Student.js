const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name of the student is required"]
    },
    rollno : {
        type : String,
        required : [true,"Roll No of the student is required"],
        unique : true
    },
    email : {
        type : String,
        unique : true,
        required : [true,"email of the student is required"],
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : [true,"password of the student is required"],
    },
    phoneno : {
        type : Number,
        required : [true,"PhoneNo of the student is required"],
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    department : {
        type : String,
        required : [true,"Department of the student is required"]
    },
    role : {
        type : String,
        default : "student"
    },
    section : {
        type : String,
        required : [true,"section of the student is required"]
    },
    presentdays : {
        type : [String],
        default : []
    },
    absentdays : {
        type : [String],
        default : []
    }
},
{
    timestamps : true
}
)

module.exports = mongoose.model("Student",schema)