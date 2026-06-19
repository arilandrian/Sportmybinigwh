import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const venuesPath = path.join(__dirname, '..', 'data', 'venues.json');
const bookingsPath = path.join(__dirname, '..', 'data', 'bookings.json');

function loadVenues() {
  const data = fs.readFileSync(venuesPath, 'utf-8');
  return JSON.parse(data);
}

function loadBookings() {
  const data = fs.readFileSync(bookingsPath, 'utf-8');
  return JSON.parse(data);
}

// GET /api/venues
export function getAllVenues(req, res) {
  try {
    let venues = loadVenues();
    const { type } = req.query;

    if (type) {
      venues = venues.filter(v => v.type === type);
    }

    res.json({ success: true, data: venues });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// GET /api/venues/:id
export function getVenueById(req, res) {
  try {
    const venues = loadVenues();
    const venue = venues.find(v => v.id === req.params.id);

    if (!venue) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }

    res.json({ success: true, data: venue });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// GET /api/venues/:id/slots?date=YYYY-MM-DD
export function getVenueSlots(req, res) {
  try {
    const venues = loadVenues();
    const venue = venues.find(v => v.id === req.params.id);

    if (!venue) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }

    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, error: 'Date parameter is required (YYYY-MM-DD)' });
    }

    // Generate time slots based on venue operating hours
    const slots = [];
    const [openH, openM] = venue.openTime.split(':').map(Number);
    const [closeH, closeM] = venue.closeTime.split(':').map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;
    const duration = venue.slotDurationMinutes;

    // Load bookings to check availability
    const bookings = loadBookings();
    const venueBookings = bookings.filter(
      b => b.venueId === venue.id && b.date === date && b.status !== 'EXPIRED' && b.status !== 'FAILED'
    );

    for (let time = openMinutes; time + duration <= closeMinutes; time += duration) {
      const startH = Math.floor(time / 60).toString().padStart(2, '0');
      const startM = (time % 60).toString().padStart(2, '0');
      const endTime = time + duration;
      const endH = Math.floor(endTime / 60).toString().padStart(2, '0');
      const endM = (endTime % 60).toString().padStart(2, '0');

      const slotStart = `${startH}:${startM}`;
      const slotEnd = `${endH}:${endM}`;

      const isBooked = venueBookings.some(b => b.timeSlot === slotStart);

      slots.push({
        start: slotStart,
        end: slotEnd,
        available: !isBooked,
        price: venue.pricePerHour
      });
    }

    res.json({ success: true, data: { venue, date, slots } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
