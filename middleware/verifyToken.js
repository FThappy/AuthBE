import jwt from "jsonwebtoken";

export const verifyToken = (req,res, next)=>{
    const token = req.cookies.Authorization;
    if(!token){
        return res.status(401).json({message : "Token not valid", code : 4})
    }
    jwt.verify(token,process.env.JWT_SEC,(err, result)=>{
        if(err){
            return res.status(403).json({message : "Token not valid", code : 4})
        }
        req.userId = result
        next()
    })
}