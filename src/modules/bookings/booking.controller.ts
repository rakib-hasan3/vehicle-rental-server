import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(
      req.user,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: any, res: Response) => {
  try {
    const result = await bookingService.getBookings(req.user);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: any, res: Response) => {
  try {
    const result = await bookingService.updateBooking(
      req.user,
      req.params.bookingId
    );

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  updateBooking,
};