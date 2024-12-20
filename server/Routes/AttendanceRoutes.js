const express = require("express")
const router = express.Router()
const { verifyRole } = require("../Middleware/validateUserHandler")
const { validateUser } = require("../Middleware/validationHandler");
const { addAttendance, getStudents } = require("../Controllers/attendanceController");


router.route("/").post(validateUser,verifyRole("Admin","Superadmin","masteradmin"),addAttendance).get(validateUser,verifyRole("Admin","Superadmin,masteradmin"),getStudents)

module.exports = router