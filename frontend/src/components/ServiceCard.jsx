import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Futsal',
    description: 'Lapangan futsal indoor & outdoor berstandar FIFA dengan rumput sintetis premium. Tersedia 3 lapangan dengan berbagai ukuran.',
    count: '3 Lapangan',
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 3.3l1.35-.95c1.82.56 3.37 1.76 4.38 3.34l-.39 1.34-1.35.46L13 6.7V5.3zm-3.35-.95L11 5.3v1.4L7.01 9.49l-1.35-.46-.39-1.34c1.01-1.58 2.56-2.78 4.38-3.34zM7.08 17.11l-1.14.1C4.73 15.81 4 13.99 4 12c0-.12.01-.23.02-.35l1-.73 1.38.48 1.46 4.34-.78 1.37zm7.42 2.48c-.79.26-1.63.41-2.5.41s-1.71-.15-2.5-.41l-.69-1.49.64-1.1h5.11l.64 1.11-.7 1.48zM14.27 15H9.73l-1.35-4.02L12 8.44l3.63 2.54L14.27 15zm3.79 2.21l-1.14-.1-.78-1.37 1.46-4.34 1.38-.48 1 .73c.01.12.02.23.02.35 0 1.99-.73 3.81-1.94 5.21z"/>
      </svg>
    ),
    type: 'futsal'
  },
  {
    title: 'Badminton',
    description: 'Court badminton indoor berstandar BWF dengan lantai karet anti-slip dan pencahayaan optimal. Tersedia 4 court premium.',
    count: '4 Court',
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M12.5 2.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 7.28c-.45-.34-1.07-.26-1.42.18l-1.43 1.81-1.73-2.18c-.2-.25-.5-.4-.82-.4h-2.6c-.54 0-1.07.26-1.39.72L5.78 12.4c-.31.44-.22 1.05.22 1.37.44.31 1.05.22 1.37-.22l1.24-1.76.57 7.21-2.13 3.52c-.29.48-.13 1.09.35 1.38.48.29 1.09.13 1.38-.35l2.1-3.47h.05l2.1 3.47c.29.48.9.64 1.38.35.48-.29.64-.9.35-1.38l-2.13-3.52.57-5.78 1.63 2.06c.24.31.62.49 1.01.49.11 0 .23-.01.34-.05l2.95-.87c.53-.16.83-.71.67-1.24-.16-.53-.71-.83-1.24-.67l-2.19.64-1.43-1.81 1.43-1.81c.34-.45.26-1.07-.18-1.42z"/>
      </svg>
    ),
    type: 'badminton'
  },
  {
    title: 'Tenis',
    description: 'Lapangan tenis outdoor hard court dan indoor clay court berstandar ITF. Pengalaman bermain profesional.',
    count: '2 Lapangan',
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <circle cx="12" cy="12" r="9" fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M12 3c-1.5 3.5-1.5 7 0 9s1.5 5.5 0 9" fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M3 12h18" fill="none" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
    type: 'tennis'
  }
];

export default function ServiceCard() {
  return (
    <section className="services-section section" id="services">
      <div className="container">
        <div className="services-section__header">
          <p className="services-section__label">Layanan Kami</p>
          <h2 className="services-section__title">Pilih Olahraga Favoritmu</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              className="service-card animate-on-scroll"
              key={service.type}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="service-card__icon">
                {service.icon}
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <p className="service-card__count">{service.count}</p>
              <Link
                to={`/venues?type=${service.type}`}
                className="btn btn-outlined"
              >
                Lihat Lapangan
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
