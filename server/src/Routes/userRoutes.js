const express = require("express")
const { loginUser, registerStudent, registerAdmin } = require("../Controllers/loginController")
const { verifyRole } = require("../Middleware/validateUserHandler")
const router = express.Router()

router.post("/login",loginUser)
router.post("/register/student",verifyRole("admin","superadmin"),registerStudent)
router.post("/register/Admin",verifyRole("superadmin"),registerAdmin)

module.exports = router