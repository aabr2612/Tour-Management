import express from 'express';
import { createBooking, deleteBooking, getAllBookings, getBooking } from '../controllers/bookingController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const bookingRoute = express.Router();

// Create a new review for a tour
bookingRoute.post('/', createBooking);

bookingRoute.get('/:id', getBooking);

bookingRoute.post('/all',verifyAdmin, getAllBookings);

bookingRoute.delete('/:id',deleteBooking);

export default bookingRoute
