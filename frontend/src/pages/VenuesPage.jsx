import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VenueCard from '../components/VenueCard';
import Footer from '../components/Footer';
import { fetchVenues } from '../utils/api';

export default function VenuesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(searchParams.get('type') || 'all');

  useEffect(() => {
    const type = searchParams.get('type') || '';
    setActiveFilter(type || 'all');
    loadVenues(type);
  }, [searchParams]);

  const loadVenues = async (type) => {
    setLoading(true);
    try {
      const data = await fetchVenues(type);
      setVenues(data);
    } catch (err) {
      console.error('Failed to load venues:', err);
    }
    setLoading(false);
  };

  const handleFilter = (type) => {
    if (type === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ type });
    }
  };

  const filters = [
    { label: 'Semua', value: 'all' },
    { label: 'Futsal', value: 'futsal' },
    { label: 'Badminton', value: 'badminton' },
    { label: 'Tenis', value: 'tennis' }
  ];

  return (
    <>
      <div className="venues-page">
        <div className="container">
          <div className="venues-page__header">
            <h1 className="venues-page__title">Semua Lapangan</h1>
            <p className="venues-page__subtitle">
              Pilih lapangan terbaik untuk pertandingan atau latihan rutin kamu
            </p>
          </div>

          <div className="venues-filter">
            {filters.map(f => (
              <button
                key={f.value}
                className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
                onClick={() => handleFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-page" style={{ minHeight: '400px' }}>
              <div className="spinner"></div>
              <p>Memuat lapangan...</p>
            </div>
          ) : venues.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-fog-gray)' }}>
              <p className="text-body-lg">Tidak ada lapangan ditemukan</p>
            </div>
          ) : (
            <div className="venues-all-grid">
              {venues.map(venue => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
