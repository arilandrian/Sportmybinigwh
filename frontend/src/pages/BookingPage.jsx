import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';
import { fetchVenueById, fetchVenueSlots, createBooking, formatCurrency } from '../utils/api';

const typeImages = {
  futsal: '/images/futsal.png',
  badminton: '/images/badminton.png',
  tennis: '/images/tennis.png'
};

export default function BookingPage() {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVenue();
  }, [venueId]);

  useEffect(() => {
    if (venue && selectedDate) {
      loadSlots();
    }
  }, [venue, selectedDate]);

  const loadVenue = async () => {
    try {
      const data = await fetchVenueById(venueId);
      setVenue(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loadSlots = async () => {
    try {
      const data = await fetchVenueSlots(venueId, selectedDate);
      setSlots(data.slots);
    } catch (err) {
      console.error('Failed to load slots:', err);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = async (bookingData) => {
    setBookingLoading(true);
    setError(null);

    try {
      const result = await createBooking(bookingData);
      // Redirect to Xendit payment page
      if (result.invoiceUrl) {
        window.location.href = result.invoiceUrl;
      }
    } catch (err) {
      setError(err.message);
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
        <p>Memuat detail lapangan...</p>
      </div>
    );
  }

  if (error && !venue) {
    return (
      <div className="loading-page">
        <p style={{ color: '#ef4444', fontSize: '18px' }}>❌ {error}</p>
      </div>
    );
  }

  const image = typeImages[venue.type] || '/images/futsal.png';

  return (
    <>
      <section className="booking-section section">
        <div className="container">
          <div className="booking-layout">
            {/* Venue Info - Left */}
            <div className="booking-venue-info">
              <img
                src={image}
                alt={venue.name}
                className="booking-venue-info__image"
              />
              <p className="booking-venue-info__type">{venue.type}</p>
              <h2 className="booking-venue-info__name">{venue.name}</h2>
              <p className="booking-venue-info__desc">{venue.description}</p>

              <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-1px' }}>
                    {formatCurrency(venue.pricePerHour)}
                  </span>
                  <span style={{ color: 'var(--color-fog-gray)', fontSize: '14px' }}> / jam</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="#fbbf24">
                    <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
                  </svg>
                  <span style={{ fontWeight: '600' }}>{venue.rating}</span>
                </div>
              </div>

              <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-obsidian)', marginBottom: '8px' }}>
                Fasilitas
              </p>
              <div className="booking-venue-info__facilities">
                {venue.facilities.map((f, i) => (
                  <span key={i} className="facility-tag">{f}</span>
                ))}
              </div>

              <div style={{ marginTop: '20px', padding: '12px 16px', background: 'var(--color-paper-white)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--color-fog-gray)' }}>Jam Operasional</span>
                <span style={{ fontWeight: '600' }}>{venue.openTime} - {venue.closeTime}</span>
              </div>
            </div>

            {/* Booking Form - Right */}
            <div>
              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '20px',
                  color: '#ef4444',
                  fontSize: '14px'
                }}>
                  ⚠️ {error}
                </div>
              )}
              <BookingForm
                venue={venue}
                slots={slots}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onSubmit={handleBooking}
                loading={bookingLoading}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
