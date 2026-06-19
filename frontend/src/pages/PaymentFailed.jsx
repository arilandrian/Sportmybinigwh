import { Link, useSearchParams } from 'react-router-dom';

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('booking_id');

  return (
    <div className="payment-status">
      <div>
        <div className="payment-status__icon failed">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>

        <h1 className="payment-status__title">Pembayaran Gagal</h1>
        <p className="payment-status__message">
          Maaf, pembayaran kamu tidak berhasil atau telah kedaluwarsa. Silakan coba booking kembali.
        </p>

        {bookingId && (
          <div className="payment-status__details">
            <div className="payment-status__detail-row">
              <span>Booking ID</span>
              <span>{bookingId}</span>
            </div>
            <div className="payment-status__detail-row">
              <span>Status</span>
              <span style={{ color: '#ef4444' }}>✕ Gagal / Kedaluwarsa</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/venues" className="btn btn-violet">
            Coba Booking Lagi
          </Link>
          <Link to="/" className="btn btn-outlined">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
