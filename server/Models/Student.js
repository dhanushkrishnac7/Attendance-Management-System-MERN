const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name of the student required"]
    },
    email : {
        type : String,
        unique : true,
        required : [true,"Name of the student required"]
    }
})

module.exports = mongoose.model("Student",schema)