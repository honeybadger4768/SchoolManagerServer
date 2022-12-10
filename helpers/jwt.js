import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()
const controlJwt = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (e) {
        switch (e.name){
            case "TokenExpiredError":
                return res.status(401).json({
                    status: 1,
                    message: "please refresh your token"
                })
            case "JsonWebTokenError":
                return res.status(401).json({
                    status: 2,
                    message: "invalid token"
                });
            default:
                return res.status(401).json({
                    status: 3,
                    message: "invalid error"
                });
        }
    }
}

export default controlJwt
