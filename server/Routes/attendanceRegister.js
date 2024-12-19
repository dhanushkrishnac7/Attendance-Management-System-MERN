const express = require('express')
const { attendanceRecord } = require('../Controllers/attendanceRecord')
const { verifyRole } = require('../Middleware/validateUserHandler')
const { validateUser } = require('../Middleware/validationHandler')
const router = express.Router()

router.post('/attendance',validateUser,verifyRole("admin","superadmin","masteradmin"),attendanceRecord)

module.exports = router