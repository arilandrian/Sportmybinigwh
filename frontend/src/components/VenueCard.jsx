import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/api';

const typeImages = {
  futsal: '/images/futsal.png',
  badminton: '/images/badminton.png',
  tennis: '/images/tennis.png'
};

export default function VenueCard({ venue }) {
  const image = typeImages[venue.type] || '/images/futsal.png';

  return (
    <Link to={`/booking/${venue.id}`} className="venue-card" id={`venue-${venue.id}`}>
      <img
        src={image}
        alt={venue.name}
        className="venue-card__image"
      />
      <div className="venue-card__overlay"></div>

      <div className="venue-card__content">
        <span className="venue-card__type">{venue.type}</span>

        <div className="venue-card__bottom">
          <div className="venue-card__info">
            <h3 className="venue-card__name">{venue.name}</h3>
            <p className="venue-card__price">
              <strong>{formatCurrency(venue.pricePerHour)}</strong> / jam
            </p>
            <div className="venue-card__rating">
              <svg viewBox="0 0 20 20">
                <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
              </svg>
              <span>{venue.rating}</span>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>({venue.totalBookings}+ booking)</span>
            </div>
          </div>

          <div className="venue-card__expand">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
