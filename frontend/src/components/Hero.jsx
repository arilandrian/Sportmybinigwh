import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <img
        src="/images/hero-bg.png"
        alt="Sports arena"
        className="hero__bg"
      />
      <div className="hero__overlay"></div>

      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot"></span>
          <span className="hero__badge-text">Platform Booking #1 di Indonesia</span>
        </div>

        <h1 className="hero__headline">
          BERIKAN<br />
          <span>PEFORMA</span><br />
          TERBAIKMU
        </h1>

        <p className="hero__subtext">
          Booking lapangan futsal, badminton, dan tenis dengan mudah.
          Bayar instan via Xendit, langsung main tanpa ribet.
        </p>

        <div className="hero__actions">
          <Link to="/venues" className="btn btn-white btn-lg">
            Booking Sekarang
          </Link>
          <a href="#services" className="btn btn-outlined" style={{
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.3)'
          }}>
            Lihat Lapangan
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-number">9+</div>
            <div className="hero__stat-label">Lapangan Tersedia</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-number">5K+</div>
            <div className="hero__stat-label">Booking Selesai</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-number">4.8</div>
            <div className="hero__stat-label">Rating Pengguna</div>
          </div>
        </div>
      </div>
    </section>
  );
}
