import express from 'express';
import bookingModel from '../models/bookingModel.js';
import { createBooking, getPoojas } from '../controllers/bookingController.js';


const bookingRouter = express.Router();


bookingRouter.get('/', async (req, res) => {
    const bookings = await bookingModel.find()
    res.status(200).json(bookings)
})

bookingRouter.get('/poojas', getPoojas)
bookingRouter.post('/create', createBooking)

export default bookingRouter;