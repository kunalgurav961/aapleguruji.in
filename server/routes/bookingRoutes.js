import express from 'express';
import { createBooking, getMyBookings, getPoojas } from '../controllers/bookingController.js';
import { requireAuth } from '../middleware/authMiddleware.js';


const bookingRouter = express.Router();


bookingRouter.get('/poojas', getPoojas)
bookingRouter.get('/mine', requireAuth, getMyBookings)
bookingRouter.post('/create', requireAuth, createBooking)

export default bookingRouter;