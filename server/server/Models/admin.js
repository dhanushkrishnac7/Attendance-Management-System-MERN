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
    presentdays:{
        type : [Date],
        default : []
    },
    absentdays:{
        type:[Date],
        default :[]
    }

})

module.exports = mongoose.model("Admin",schema)