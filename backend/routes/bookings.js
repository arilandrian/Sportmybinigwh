import express from 'express';
import { createBooking, getBookingStatus, handleWebhook } from '../controllers/bookingController.js';

const router = express.Router();

// POST /api/bookings — Create a new booking + Xendit invoice
router.post('/', createBooking);

// GET /api/bookings/:id — Get booking status
router.get('/:id', getBookingStatus);

// POST /api/bookings/webhook — Xendit webhook callback
router.post('/webhook', handleWebhook);

export default router;
