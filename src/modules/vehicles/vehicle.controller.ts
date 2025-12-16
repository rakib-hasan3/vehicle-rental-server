import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const creatVehicle = async(req:Request,res:Response)=>{
  const {vehicle_name,type,registration_number,daily_rent_price,availability_status}= req.body;

  try{
      const result = await vehicleServices.creatVehicle(vehicle_name,type,registration_number,daily_rent_price,availability_status);

      res.status(201).json({
        success:true,
        message: "vehicle created successfully",
        data: result.rows[0]
      })
  }
  catch(err:any){
      res.status(500).json({
        success:false,
        message:err.message
      })
  }
};

const getVehicles = async(req:Request,res:Response)=>{
  try{
     const result = await vehicleServices.getVehicles();
     res.status(200).json({
      success:true,
      message:"vehicles retrieved successfully",
      data: result.rows,
     })   

  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message,
      details:err,
    })
  }
}

const getSingleVehicle = async(req:Request,res:Response)=>{
  try{
     const result = await vehicleServices.getSingleVehicle(req.params.id as string) ;
     if(result.rows.length === 0 ){
         return res.status(404).json({error: "Vehicle not found"});
     }
     res.json(result.rows[0]);
      

  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message,
      details:err,
    })
  }
};

const updateVehicle = async(req:Request,res:Response)=>{
    const {vehicle_name,type,registration_number,daily_rent_price,availability_status}= req.body;

  try{
     const result = await vehicleServices.updateVehicle(vehicle_name,type,registration_number,daily_rent_price,availability_status,req.params.id!);
     if(result.rows.length === 0 ){
         return res.status(404).json({error: "Vehicle not found"});
     }
     res.status(200).json({
      success:true,
      message:"Vehicle updated successfully",
      data: result.rows,
     });
      

  }catch(err:any){
    res.status(500).json({
     error: "Failed to update Vehicle"
      
    })
  }
};

const deleteVehicle = async(req:Request,res:Response)=>{
  try{
     const result = await vehicleServices.deleteVehicle(req.params.id as string);

    if(result.rowCount === 0) {
      res.status(400).json({
        error: "Vehicles not found"
      });
    }
  res.json({success:true,message:"Vehicle deleted successfully"})
  

  }catch(err:any){
    console.log(err);
    res.status(500).json({error: "Failed to delete vehicle"})
    }
  }

export const vehicleController = {
    creatVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle

}