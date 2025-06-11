import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
export function authMiddleware(req, res, next ){
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith("Bearer ")){
        return res.status(404).json({
            message: "No token detected, signin to continue"
        });
    };

    const token = authHeaders.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();

    }catch(e){
        console.log("error from authentication: " + error);
        res.status(411).json({
        message: "Invalid token",
     });
         return;

    }
    
}