const verifyRole = (...allowedRoles) =>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            res.status(403);
            throw new Error(`Can be accessed only by ${allowedRoles}`);
        }
        next()
    }
}

module.exports = {verifyRole}