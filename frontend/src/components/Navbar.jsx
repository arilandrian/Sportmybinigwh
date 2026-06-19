import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <Link to="/" className="navbar__logo">
        SPORT<span>MY</span>BINIGWH
      </Link>

      <div className={`navbar__links ${menuOpen ? 'open' : ''}`}>
        <Link
          to="/"
          className={`navbar__link ${isActive('/') ? 'active' : ''}`}
        >
          Beranda
        </Link>
        <Link
          to="/venues"
          className={`navbar__link ${isActive('/venues') ? 'active' : ''}`}
        >
          Lapangan
        </Link>
        <a href="/#how-it-works" className="navbar__link">
          Cara Booking
        </a>
        <a href="/#footer" className="navbar__link">
          Kontak
        </a>
        <Link to="/venues" className="btn btn-violet navbar__cta">
          Booking Sekarang
        </Link>
      </div>

      <button
        className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
