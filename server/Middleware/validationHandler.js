const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateUser = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization||req.headers.Authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401);
        throw new Error("Authorization header missing or invalid");
    }

    token = authHeader.split(" ")[1];
    if(!token){
        res.status(401);
        throw new Error("Token is missing")
    }

    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err?.name === "TokenExpiredError") {
                res.status(401);
                reject(new Error("Token has expired"));
            }
            if (err) {
                res.status(401);
                reject(new Error("Invalid token"));
            }
            resolve(decoded);
        });
    });

    req.user = {
        role: decoded.role,
        id: decoded._id,
        department: decoded.department,
    };
    
    next();
});

module.exports = {validateUser}