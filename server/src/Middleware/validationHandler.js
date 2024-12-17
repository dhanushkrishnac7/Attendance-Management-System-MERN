const jwt = require("jsonwebtoken")
const asynchandler = require("express-async-handler")

const validateUser = asynchandler((req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if(!token){
            res.status(401)
            throw new Error({message : "No token , Access denied"});
        }
        try{
        const valid = jwt.verify(token,process.env.JWT_SECRET)
        req.user = valid;
        next()
        }catch(err){
            res.status(403);
            throw new Error({message:"forbidden access"})
        }
    }else{
        res.status(403);
        throw new Error({message : "Access denied"})
    }
})

module.exports = {validateUser}