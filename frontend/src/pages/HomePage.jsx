import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import VenueCarousel from '../components/VenueCarousel';
import PricingCard from '../components/PricingCard';
import Footer from '../components/Footer';

function HowItWorks() {
  const steps = [
    { number: '1', title: 'Pilih Lapangan', desc: 'Jelajahi berbagai lapangan futsal, badminton, dan tenis yang tersedia.' },
    { number: '2', title: 'Pilih Jadwal', desc: 'Pilih tanggal dan jam yang sesuai dengan ketersediaan real-time.' },
    { number: '3', title: 'Bayar via Xendit', desc: 'Pembayaran aman & instan via berbagai metode: e-wallet, VA, kartu kredit.' },
    { number: '4', title: 'Main!', desc: 'Terima konfirmasi otomatis dan langsung datang ke lapangan.' }
  ];

  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <div className="how-it-works__header">
          <p className="how-it-works__label">Cara Booking</p>
          <h2 className="how-it-works__title">Semudah 4 Langkah</h2>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <div className="step-card__number">{step.number}</div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="cta-band">
      <div className="container">
        <h2 className="cta-band__title">Siap Bermain?</h2>
        <p className="cta-band__subtitle">
          Booking lapangan favoritmu sekarang dan dapatkan pengalaman bermain terbaik bersama Sportmybinigwh.
        </p>
        <Link to="/venues" className="btn btn-white btn-lg">
          Booking Sekarang
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCard />
      <VenueCarousel />
      <HowItWorks />
      <PricingCard />
      <CTABand />
      <Footer />
    </>
  );
}
