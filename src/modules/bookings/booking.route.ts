import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const bookingRouter = Router();

 
bookingRouter.post(
  "/",
  auth("admin","user"),
  bookingController.createBooking
);

 
bookingRouter.get(
  "/",
  auth("admin","user"),
  bookingController.getBookings
);

 
bookingRouter.put(
  "/:bookingId",
  auth("admin","user"),
  bookingController.updateBooking
);

export default bookingRouter;