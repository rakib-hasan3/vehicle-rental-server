import { pool } from "../../config/db";

const createBooking = async (user: any, payload: any) => {
  const { customer_id,vehicle_id, rent_start_date, rent_end_date } = payload;

  if (new Date(rent_end_date) <= new Date(rent_start_date)) {
    throw new Error("End date must be after start date");
  }

  // check vehicle
  const vehicleRes = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  const vehicle = vehicleRes.rows[0];
  if (!vehicle || vehicle.availability_status !== "available") {
    throw new Error("Vehicle not available");
  }

  // calculate days
  const days =
    (new Date(rent_end_date).getTime() -
      new Date(rent_start_date).getTime()) /
    (1000 * 60 * 60 * 24);

  const total_price = days * vehicle.daily_rent_price;

  // create booking
  const bookingRes = await pool.query(
    `
    INSERT INTO booking (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  // update vehicle status
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );


  return bookingRes.rows[0];
};

const getBookings = async (user: any) => {
  if (user.role === "admin") {
    const res = await pool.query(`SELECT * FROM booking`);
    return res.rows;
  }

  const res = await pool.query(
    `SELECT * FROM booking WHERE customer_id=$1`,
    [user.id]
  );
  return res.rows;
};

const updateBooking = async (user: any, bookingId: string) => {
  const res = await pool.query(
    `SELECT * FROM booking WHERE id=$1`,
    [bookingId]
  );

  const booking = res.rows[0];
  if (!booking) throw new Error("Booking not found");

  // CUSTOMER cancel
  if (user.role === "customer") {
    if (new Date(booking.rent_start_date) <= new Date()) {
      throw new Error("Cannot cancel after rental start");
    }

    await pool.query(
      `UPDATE booking SET status='cancelled' WHERE id=$1`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );

    return { message: "Booking cancelled" };
  }

  // ADMIN return
  if (user.role === "admin") {
    await pool.query(
      `UPDATE booking SET status='returned' WHERE id=$1`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );

    return { message: "Vehicle returned" };
  }

  throw new Error("Forbidden");
};

export const bookingService = {
       updateBooking,
       createBooking,
       getBookings
}