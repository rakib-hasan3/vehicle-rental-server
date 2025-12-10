import express, { Request, Response } from "express";
import {Pool} from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path:path.join(process.cwd(), ".env")})

const app = express();
const port = 5000;




// parser
app.use(express.json());

// DB
const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STR}`
});

const initDB = async()=>{
  // user table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY  KEY ,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  // vehivles booking
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY ,
    vehicle_name TEXT NOT NULL,
    type TEXT CHECK (type IN ('car' ,'bike','van','SUV')) NOT NULL,
    registration_number TEXT UNIQUE NOT NULL,
    daily_rent_price NUMERIC NOT NULL,
    availability_status TEXT CHECK (availability_status IN ('available','booked')) NOT NULL DEFAULT 'available'
    )
    `);
    // bookings  table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS booking (
      id SERIAL PRIMARY KEY ,
      customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      status TEXT CHECK (status IN ('active','cancelled','returned')) NOT NULL DEFAULT 'active'
      )
      `)


}

initDB();


 


app.get('/', (req:Request, res:Response) => {
  res.send('Hello  ')
});

app.post("/",(req:Request,res:Response)=>{
    console.log(req.body);

    res.status(201).json({
        success:true,
        message: "API is working"
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
