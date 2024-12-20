const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    department : {
        type : String,
        required : [true,"Department of the class is required"]
    },
    section : {
        type : String,
        required : [true,"Department of the class is required"]
    },
    attendancetaken : {
        type : [String],
        default : []
    }
})

module.exports = mongoose.model("class",schema)