import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config";
import { error } from "console";


const loginUser = async(email:string,password:string)=>{
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);
    if(result.rows.length === 0){
         return Error("Invalid email or password");
    };

    const user = result.rows[0];

    const match = await bcrypt.compare(password,user.password);

    if(!match){
      throw new Error("Invalid email or password");
    }
     const token = jwt.sign({name:user.name,email:user.email,role:user.role},config.jwtSecret as string,{
        expiresIn:"7d",
       
    }) ;
    // console.log({token});
    return{token,user};
};

const signupUser = async (payload: any) => {
  const { name, email, password, phone, role } = payload;

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, LOWER($2), $3, $4, $5)
    RETURNING id, name, email,phone, role
    `,
    [name, email, hashedPassword, phone, role || "customer"]
  );

  return result.rows[0];
};

export const authServices = {
       loginUser,
       signupUser
}