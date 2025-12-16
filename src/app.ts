import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/users/user.route";
import { vehicleRoute } from "./modules/vehicles/vehicle.route";
import { authRoutes } from "./modules/auth/auth.routes";
import bookingRouter from "./modules/bookings/booking.route";
 

const app = express();

// parser
app.use(express.json());

// initializing DB
initDB();

app.get('/', logger,(req:Request, res:Response) => {
  res.send('Hello  ')
});

 
app.use("/api/v1/users",userRoute);
app.use("/api/v1/vehicles",vehicleRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/bookings",bookingRouter);


app.use((req,res)=>{
  res.status(404).json({
    success:false,
    message:"Route not found",
    path:req.path,
  });
});

 

export default app;
