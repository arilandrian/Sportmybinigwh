import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookingsPath = path.join(__dirname, '..', 'data', 'bookings.json');
const venuesPath = path.join(__dirname, '..', 'data', 'venues.json');

function loadBookings() {
  const data = fs.readFileSync(bookingsPath, 'utf-8');
  return JSON.parse(data);
}

function saveBookings(bookings) {
  fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));
}

function loadVenues() {
  const data = fs.readFileSync(venuesPath, 'utf-8');
  return JSON.parse(data);
}

// POST /api/bookings
export async function createBooking(req, res) {
  try {
    const { venueId, date, timeSlot, duration, customerName, customerEmail, customerPhone } = req.body;

    // Validation
    if (!venueId || !date || !timeSlot || !customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: venueId, date, timeSlot, customerName, customerEmail'
      });
    }

    // Find venue
    const venues = loadVenues();
    const venue = venues.find(v => v.id === venueId);
    if (!venue) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }

    // Check slot availability
    const bookings = loadBookings();
    const isSlotTaken = bookings.some(
      b => b.venueId === venueId && b.date === date && b.timeSlot === timeSlot &&
           b.status !== 'EXPIRED' && b.status !== 'FAILED'
    );

    if (isSlotTaken) {
      return res.status(409).json({ success: false, error: 'Time slot is already booked' });
    }

    // Calculate amount
    const hours = duration || 1;
    const amount = venue.pricePerHour * hours;

    // Create booking record
    const bookingId = `BOOK-${uuidv4().slice(0, 8).toUpperCase()}`;
    const booking = {
      id: bookingId,
      venueId,
      venueName: venue.name,
      venueType: venue.type,
      date,
      timeSlot,
      duration: hours,
      amount,
      currency: 'IDR',
      customerName,
      customerEmail,
      customerPhone: customerPhone || '',
      status: 'PENDING',
      xenditInvoiceId: null,
      xenditInvoiceUrl: null,
      createdAt: new Date().toISOString()
    };

    // Create Xendit Invoice
    const XENDIT_SECRET_KEY = process.env.XENDIT_SECRET_KEY;
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

    const invoicePayload = {
      external_id: bookingId,
      amount: amount,
      description: `Booking ${venue.name} - ${date} ${timeSlot} (${hours} jam)`,
      currency: 'IDR',
      invoice_duration: 3600, // 1 hour expiry
      customer: {
        given_names: customerName,
        email: customerEmail,
        mobile_number: customerPhone || undefined
      },
      success_redirect_url: `${FRONTEND_URL}/payment/success?booking_id=${bookingId}`,
      failure_redirect_url: `${FRONTEND_URL}/payment/failed?booking_id=${bookingId}`,
      items: [
        {
          name: venue.name,
          quantity: hours,
          price: venue.pricePerHour
        }
      ]
    };

    // Call Xendit API
    const xenditResponse = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(XENDIT_SECRET_KEY + ':').toString('base64')
      },
      body: JSON.stringify(invoicePayload)
    });

    const xenditData = await xenditResponse.json();

    if (!xenditResponse.ok) {
      console.error('Xendit error:', xenditData);
      return res.status(500).json({
        success: false,
        error: 'Failed to create payment invoice',
        details: xenditData
      });
    }

    // Update booking with Xendit data
    booking.xenditInvoiceId = xenditData.id;
    booking.xenditInvoiceUrl = xenditData.invoice_url;

    // Save booking
    bookings.push(booking);
    saveBookings(bookings);

    res.status(201).json({
      success: true,
      data: {
        bookingId: booking.id,
        invoiceUrl: xenditData.invoice_url,
        amount: booking.amount,
        expiresAt: xenditData.expiry_date
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// GET /api/bookings/:id
export function getBookingStatus(req, res) {
  try {
    const bookings = loadBookings();
    const booking = bookings.find(b => b.id === req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// POST /api/bookings/webhook — Xendit webhook callback
export function handleWebhook(req, res) {
  try {
    const { external_id, status, id, paid_at } = req.body;

    console.log(`📩 Webhook received: ${external_id} -> ${status}`);

    const bookings = loadBookings();
    const bookingIndex = bookings.findIndex(b => b.id === external_id);

    if (bookingIndex === -1) {
      console.warn(`Booking ${external_id} not found for webhook`);
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Update booking status
    bookings[bookingIndex].status = status; // PAID, EXPIRED, FAILED
    if (paid_at) {
      bookings[bookingIndex].paidAt = paid_at;
    }

    saveBookings(bookings);

    console.log(`✅ Booking ${external_id} updated to ${status}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
