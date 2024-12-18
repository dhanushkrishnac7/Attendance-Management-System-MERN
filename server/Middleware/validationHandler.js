const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateUser = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization||req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if (err && err.name === "TokenExpiredError") {
                res.status(401).json({ message: "Token expired" });
                return;
            }
            if (err) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            req.user = decoded;
            next();
        })
        if(!token){
            res.status(401);
            throw new Error("User is Unauthorized")
        }
    }

});

module.exports = {validateUser}