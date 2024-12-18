const express = require("express")
const { loginUser, registerStudent, registerAdmin, registerSuperAdmin, registermasterAdmin } = require("../Controllers/loginController")
const { verifyRole } = require("../Middleware/validateUserHandler")
const { validateUser } = require("../Middleware/validationHandler")
const router = express.Router()

router.post("/login",loginUser)
router.post("/register/student",validateUser,verifyRole("admin","superadmin","masteradmin"),registerStudent)
router.post("/register/admin",validateUser,verifyRole("superadmin","masteradmin"),registerAdmin)
router.post("/register/superadmin",validateUser,verifyRole("masteradmin"),registerSuperAdmin)
router.post("/register/masteradmin",validateUser,verifyRole("masteradmin"),registermasterAdmin)

module.exports = router