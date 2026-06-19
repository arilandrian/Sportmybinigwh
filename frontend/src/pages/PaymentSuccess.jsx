import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchBookingStatus, formatCurrency } from '../utils/api';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);
  const bookingId = searchParams.get('booking_id');

  useEffect(() => {
    if (bookingId) {
      fetchBookingStatus(bookingId)
        .then(setBooking)
        .catch(console.error);
    }
  }, [bookingId]);

  return (
    <div className="payment-status">
      <div>
        <div className="payment-status__icon success">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <h1 className="payment-status__title">Pembayaran Berhasil!</h1>
        <p className="payment-status__message">
          Terima kasih! Booking kamu telah dikonfirmasi. Detail booking telah dikirim ke email kamu.
        </p>

        {booking && (
          <div className="payment-status__details">
            <div className="payment-status__detail-row">
              <span>Booking ID</span>
              <span>{booking.id}</span>
            </div>
            <div className="payment-status__detail-row">
              <span>Lapangan</span>
              <span>{booking.venueName}</span>
            </div>
            <div className="payment-status__detail-row">
              <span>Tanggal</span>
              <span>{booking.date}</span>
            </div>
            <div className="payment-status__detail-row">
              <span>Jam</span>
              <span>{booking.timeSlot} ({booking.duration} jam)</span>
            </div>
            <div className="payment-status__detail-row">
              <span>Total</span>
              <span style={{ color: 'var(--color-pulse-violet)', fontWeight: '700' }}>
                {formatCurrency(booking.amount)}
              </span>
            </div>
            <div className="payment-status__detail-row">
              <span>Status</span>
              <span style={{ color: '#22c55e' }}>✓ {booking.status}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-violet">
            Kembali ke Beranda
          </Link>
          <Link to="/venues" className="btn btn-outlined">
            Booking Lagi
          </Link>
        </div>
      </div>
    </div>
  );
}
