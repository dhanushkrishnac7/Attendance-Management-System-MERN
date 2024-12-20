const express = require("express")
const { loginUser} = require("../Controllers/loginController")
const { verifyRole } = require("../Middleware/validateUserHandler")
const { validateUser } = require("../Middleware/validationHandler")
const { refreshAccessToken } = require("../Controllers/refreshTokenController")
const { logout } = require("../Controllers/logoutController")
const { registerStudent, registerAdmin, registerSuperAdmin, registermasterAdmin } = require("../Controllers/registerController")
const router = express.Router()

router.post("/login",loginUser)
router.post("/logout",logout)
router.post("/refresh-token",refreshAccessToken)
router.post("/register/student",validateUser,verifyRole("Admin","Superadmin","masteradmin"),registerStudent)
router.post("/register/admin",validateUser,verifyRole("Superadmin","masteradmin"),registerAdmin)
router.post("/register/superadmin",validateUser,verifyRole("masteradmin"),registerSuperAdmin)
router.post("/register/masteradmin",validateUser,verifyRole("masteradmin"),registermasterAdmin)

module.exports = router