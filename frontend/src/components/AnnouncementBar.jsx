import { useState } from 'react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="announcement-bar" id="announcement-bar">
      <p>
        🏆 Diskon 20% untuk booking pertama kamu! Gunakan kode <strong>SPORT20</strong> —{' '}
        <a href="#pricing">Lihat Penawaran</a>
      </p>
      <button
        className="announcement-bar__close"
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
      >
        ✕
      </button>
    </div>
  );
}
