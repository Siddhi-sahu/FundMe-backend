import jwt from "jsonwebtoken";
import  JWT_SECRET  from "./config";
import { NextFunction, Request, Response } from 'express';


export default function authMiddleware(req: Request, res: Response, next: NextFunction ){
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith("Bearer ")){
        return res.status(404).json({
            message: "No token detected, signin to continue"
        });
    };

    const token = authHeaders.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        // @ts-ignore
        req.userId = decoded.userId;
        next();

    }catch(e){
        console.log("error from authentication: " + e);
        res.status(411).json({
        message: "Invalid token",
     });
         return;

    }
    
}