import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Casual',
    desc: 'Untuk pemain rekreasi',
    price: 'Rp85K',
    unit: '/ jam mulai dari',
    features: [
      'Booking harian',
      'Semua jenis lapangan',
      'Pembayaran instan via Xendit',
      'Konfirmasi otomatis',
      'Dukungan pelanggan'
    ],
    featured: false,
    cta: 'Mulai Booking',
    type: ''
  },
  {
    name: 'Regular',
    desc: 'Untuk tim & komunitas',
    price: 'Rp150K',
    unit: '/ jam mulai dari',
    features: [
      'Semua fitur Casual',
      'Prioritas booking',
      'Diskon 10% setiap booking',
      'Akses lapangan premium',
      'Booking jadwal rutin',
      'Gratis 1 jam setiap 10 booking'
    ],
    featured: true,
    cta: 'Pilih Regular',
    type: ''
  },
  {
    name: 'VIP',
    desc: 'Pengalaman eksklusif',
    price: 'Rp250K',
    unit: '/ jam mulai dari',
    features: [
      'Semua fitur Regular',
      'Akses eksklusif lapangan VIP',
      'Diskon 20% setiap booking',
      'Locker & shower gratis',
      'Minuman gratis',
      'Personal event coordinator',
      'Booking untuk turnamen'
    ],
    featured: false,
    cta: 'Pilih VIP',
    type: ''
  }
];

export default function PricingCard() {
  return (
    <section className="pricing-section section" id="pricing">
      <div className="container">
        <div className="pricing-section__header">
          <p className="pricing-section__label">Harga</p>
          <h2 className="pricing-section__title">Paket yang Sesuai Kebutuhanmu</h2>
          <p className="pricing-section__subtitle">
            Pilih paket yang sesuai dengan gaya bermainmu. Semua paket termasuk akses ke semua lapangan.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
              key={plan.name}
            >
              <h3 className="pricing-card__name">{plan.name}</h3>
              <p className="pricing-card__desc">{plan.desc}</p>
              <div className="pricing-card__price">{plan.price}</div>
              <p className="pricing-card__price-unit">{plan.unit}</p>

              <ul className="pricing-card__features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <svg className="check" viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/venues"
                className={`btn ${plan.featured ? 'btn-violet' : 'btn-outlined'}`}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
