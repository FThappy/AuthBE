import jwt from "jsonwebtoken"

export const generateToken = (userId) =>{
    const token = jwt.sign({userId : userId}, process.env.JWT_SEC,{
        expiresIn : "7d"
    })

    return token
}