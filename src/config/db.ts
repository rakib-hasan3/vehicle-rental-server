import {Pool} from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: `${config.Connection_str}`
});

const initDB = async()=>{
  // user table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY  KEY ,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin','customer')) NOT NULL DEFAULT 'customer'
    )
  `);
  // vehicles booking
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,               
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
      total_price NUMERIC NOT NULL,
      status TEXT CHECK (status IN ('active','cancelled','returned')) NOT NULL DEFAULT 'active'
      )
      `)


}

export default initDB;
