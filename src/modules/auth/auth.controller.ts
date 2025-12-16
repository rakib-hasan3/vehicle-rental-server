import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async(req:Request,res:Response)=>{
    const {email,password} = req.body;

     try{
          const result = await authServices.loginUser(email,password);
    
              // console.log(result.rows[0]);
              // res.send({message:"data inserted"});
            res.status(200).json({
            success:true,
            message: "Login successful",
            data:result,
           });
    
        }
        catch(err:any){
           res.status(401).json({
            success:false,
            message:err.message
           });
        };
     

};

const signupUser = async(req:Request,res:Response)=>{
    try{
 const result = await authServices.signupUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });   
 }
    catch(err:any){
            res.status(400).json({
      success: false,
      message: err.message,
    });
    }
}
export const authController = {
    loginUser,
    signupUser
}