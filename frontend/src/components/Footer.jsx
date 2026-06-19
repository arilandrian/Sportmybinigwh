import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <h3 className="footer__brand-name">
              SPORT<span>MY</span>BINIGWH
            </h3>
            <p className="footer__brand-desc">
              Platform booking lapangan olahraga terbaik di Indonesia.
              Futsal, badminton, tenis — semua tersedia di satu tempat.
              Bayar mudah via Xendit.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Navigasi</h4>
            <Link to="/" className="footer__link">Beranda</Link>
            <Link to="/venues" className="footer__link">Lapangan</Link>
            <a href="/#how-it-works" className="footer__link">Cara Booking</a>
            <a href="/#pricing" className="footer__link">Harga</a>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Olahraga</h4>
            <Link to="/venues?type=futsal" className="footer__link">Futsal</Link>
            <Link to="/venues?type=badminton" className="footer__link">Badminton</Link>
            <Link to="/venues?type=tennis" className="footer__link">Tenis</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Kontak</h4>
            <a href="mailto:hello@sportmybinigwh.com" className="footer__link">hello@sportmybinigwh.com</a>
            <a href="tel:+6281234567890" className="footer__link">+62 812-3456-7890</a>
            <span className="footer__link">Jl. Olahraga No. 1, Jakarta</span>
          </div>
        </div>

        <div className="footer__divider"></div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Sportmybinigwh. All rights reserved.
          </p>

          <div className="footer__socials">
            <a href="#" className="footer__social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1.5"/>
              </svg>
            </a>
            <a href="#" className="footer__social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="footer__social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.287-.18-3.013.789.804-2.941-.192-.305A8 8 0 1112 20z" fill="none" stroke="currentColor" strokeWidth="0"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
