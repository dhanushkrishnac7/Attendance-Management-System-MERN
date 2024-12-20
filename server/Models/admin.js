const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name of the admin required"]
    },
    email :{
        type : String,
        unique:true,
        required: [true, "Email is required"],
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : [true,"password of the student is required"],
    },
    role : {
        type : String,
        default : "admin"
    },
    phoneno:{
        type : Number,
        required : [true,"Phone Number is required"],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v.toString()); 
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    department : {
        type : String,
        default : ""
    },
    presentdays:{
        type : [String],
        default : []
    },
    absentdays:{
        type:[String],
        default :[]
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Admin",schema)