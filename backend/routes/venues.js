import express from 'express';
import { getAllVenues, getVenueById, getVenueSlots } from '../controllers/venueController.js';

const router = express.Router();

// GET /api/venues — List all venues
router.get('/', getAllVenues);

// GET /api/venues/:id — Get venue details
router.get('/:id', getVenueById);

// GET /api/venues/:id/slots — Get available slots for a date
router.get('/:id/slots', getVenueSlots);

export default router;
