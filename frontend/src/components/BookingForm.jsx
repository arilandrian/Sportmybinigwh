import { useState } from 'react';
import { formatCurrency } from '../utils/api';

export default function BookingForm({ venue, slots, selectedDate, onDateChange, onSubmit, loading }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    onSubmit({
      venueId: venue.id,
      date: selectedDate,
      timeSlot: selectedSlot.start,
      duration,
      customerName,
      customerEmail,
      customerPhone
    });
  };

  const totalPrice = venue ? venue.pricePerHour * duration : 0;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="booking-form" onSubmit={handleSubmit} id="booking-form">
      <h3 className="booking-form__title">Detail Booking</h3>

      {/* Date Selection */}
      <div className="form-group">
        <label htmlFor="booking-date">Tanggal</label>
        <input
          type="date"
          id="booking-date"
          value={selectedDate}
          min={today}
          onChange={(e) => onDateChange(e.target.value)}
          required
        />
      </div>

      {/* Time Slots */}
      {slots && slots.length > 0 && (
        <div className="form-group">
          <label>Pilih Jam</label>
          <div className="slots-grid">
            {slots.map((slot) => (
              <button
                type="button"
                key={slot.start}
                className={`slot-btn ${
                  !slot.available ? 'slot-btn--disabled' :
                  selectedSlot?.start === slot.start ? 'slot-btn--selected' : ''
                }`}
                onClick={() => slot.available && setSelectedSlot(slot)}
                disabled={!slot.available}
              >
                {slot.start}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Duration */}
      <div className="form-group">
        <label htmlFor="booking-duration">Durasi (jam)</label>
        <select
          id="booking-duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          <option value={1}>1 Jam</option>
          <option value={2}>2 Jam</option>
          <option value={3}>3 Jam</option>
        </select>
      </div>

      {/* Customer Info */}
      <div className="form-group">
        <label htmlFor="customer-name">Nama Lengkap</label>
        <input
          type="text"
          id="customer-name"
          placeholder="Masukkan nama lengkap"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customer-email">Email</label>
        <input
          type="email"
          id="customer-email"
          placeholder="nama@email.com"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customer-phone">No. Telepon</label>
        <input
          type="tel"
          id="customer-phone"
          placeholder="08xxxxxxxxxx"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />
      </div>

      {/* Booking Summary */}
      {selectedSlot && (
        <div className="booking-summary">
          <div className="booking-summary__row">
            <span>Lapangan</span>
            <span>{venue.name}</span>
          </div>
          <div className="booking-summary__row">
            <span>Tanggal</span>
            <span>{selectedDate}</span>
          </div>
          <div className="booking-summary__row">
            <span>Jam</span>
            <span>{selectedSlot.start} ({duration} jam)</span>
          </div>
          <div className="booking-summary__row">
            <span>Harga per jam</span>
            <span>{formatCurrency(venue.pricePerHour)}</span>
          </div>
          <div className="booking-summary__row total">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-violet btn-lg"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={!selectedSlot || !customerName || !customerEmail || loading}
      >
        {loading ? 'Memproses...' : `Bayar ${formatCurrency(totalPrice)}`}
      </button>
    </form>
  );
}
