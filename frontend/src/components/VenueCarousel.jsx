import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VenueCard from './VenueCard';
import { fetchVenues } from '../utils/api';

export default function VenueCarousel() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues()
      .then(data => {
        // Show first 6 venues
        setVenues(data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load venues:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="venues-section section" id="venues">
      <div className="container">
        <div className="venues-section__header">
          <div className="venues-section__left">
            <p className="venues-section__label">Lapangan Populer</p>
            <h2 className="venues-section__title">Temukan Lapangan Terbaik</h2>
          </div>
          <Link to="/venues" className="btn btn-outlined">
            Lihat Semua
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="venues-grid">
            {venues.slice(0, 3).map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
