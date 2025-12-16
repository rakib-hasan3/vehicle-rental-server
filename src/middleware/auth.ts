// higher order function return function k

import { NextFunction, Request, Response } from "express"
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth =(...roles: string[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
      try{
             const token = req.headers.authorization ;
        console.log({authToken:token});

       if (!token || typeof token !== 'string' || !token.startsWith('Bearer ')) {
                return res.status(401).json({ 
                    success: false,
                    message: "Unauthorized: Access token is missing or malformed."
                });
            }
            const tokenSplit = token.split(' ')[1];
        const decoded = jwt.verify(tokenSplit as string,config.jwtSecret as string) as JwtPayload;
        console.log({decoded}) ;
        req.user = decoded ;

        if(roles.length && !roles.includes(decoded.role as string)){
            return res.status(500).json({
              error: "unauhorized !",

            });
        }
        next();
      }
      catch(err:any){
        res.status(401).json({
            success:false,
            message:err.message
        })
      }
      
    };
};

export default auth;



