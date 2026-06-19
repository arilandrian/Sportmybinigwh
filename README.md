# 🏟️ Sportmybinigwh

Sportmybinigwh adalah platform **Software as a Service (SaaS)** yang menyediakan layanan pemesanan fasilitas olahraga secara online. Pengguna dapat memilih lapangan olahraga yang tersedia, menentukan jadwal bermain, melakukan pemesanan, dan langsung menyelesaikan pembayaran melalui sistem pembayaran digital yang terintegrasi dengan **Xendit**.

Aplikasi dirancang dengan arsitektur modern menggunakan **React.js** pada sisi frontend dan **Node.js + Express.js** pada sisi backend sehingga memberikan pengalaman pengguna yang cepat, responsif, dan mudah digunakan.

---

# 🚀 Fitur Utama

## 📅 Sistem Booking Lapangan

* Pemesanan lapangan olahraga secara online.
* Pemilihan jadwal bermain.
* Informasi harga yang ditampilkan secara transparan.
* Proses reservasi yang sederhana dan cepat.

## 💳 Integrasi Pembayaran Online

* Terintegrasi langsung dengan Xendit.
* Pembuatan invoice pembayaran secara otomatis.
* Redirect pembayaran instan setelah booking dibuat.
* Verifikasi transaksi secara real-time.

## 🎨 Modern User Interface

* Desain modern terinspirasi dari dashboard WHOOP.
* Tampilan responsif untuk desktop maupun mobile.
* Navigasi sederhana dan mudah digunakan.

## ⚡ Arsitektur Frontend & Backend Terpisah

* Frontend React berjalan secara independen.
* Backend Express menyediakan REST API.
* Mudah dikembangkan dan di-deploy secara terpisah.

---

# 🏗️ Arsitektur Sistem

```text
User Browser
      │
      ▼
Frontend (React + Vite)
      │
      ▼
Backend API (Express.js)
      │
      ├────────► Xendit API
      │
      ▼
JSON Database
```

### Alur Sistem

1. Pengguna membuka website Sportmybinigwh.
2. Pengguna memilih fasilitas olahraga dan jadwal yang tersedia.
3. Frontend mengirimkan data booking ke Backend API.
4. Backend membuat invoice pembayaran melalui Xendit.
5. Xendit mengembalikan URL pembayaran.
6. Pengguna menyelesaikan pembayaran.
7. Status booking diperbarui setelah pembayaran berhasil diverifikasi.

---

# 🛠️ Teknologi yang Digunakan

| Teknologi        | Kegunaan               |
| ---------------- | ---------------------- |
| React.js         | Frontend Framework     |
| Vite             | Build Tool             |
| React Router DOM | Routing Frontend       |
| CSS              | User Interface Styling |
| Node.js          | Runtime Backend        |
| Express.js       | REST API Framework     |
| UUID             | Pembuatan ID Unik      |
| Xendit SDK       | Payment Gateway        |
| JSON File System | Penyimpanan Data       |
| GitHub           | Version Control        |

---

# 📋 Persyaratan Sistem

Sebelum menjalankan aplikasi, pastikan perangkat Anda memiliki:

## Software

* Node.js 18 atau lebih baru
* NPM 8 atau lebih baru
* Git
* Visual Studio Code (opsional)

## Layanan Eksternal

* Akun Xendit Sandbox/Test Mode
* API Key Xendit yang aktif

---

# ⚙️ Instalasi Lokal

## Clone Repository

```bash
git clone https://github.com/arilandrian/Sportmybinigwh.git
cd Sportmybinigwh
```

---

## Setup Backend

Masuk ke folder backend:

```bash
cd backend
npm install
```

### Konfigurasi Environment

Buat file `.env`:

```env
XENDIT_SECRET_KEY=xnd_development_your_key_here
FRONTEND_URL=http://localhost:5173
PORT=5000
```

Jalankan backend:

```bash
npm run dev
```

Backend akan berjalan pada:

```text
http://localhost:5000
```

---

## Setup Frontend

Buka terminal baru:

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan pada:

```text
http://localhost:5173
```

---

# ▶️ Menjalankan Aplikasi

Pastikan kedua service berikut berjalan:

* Backend API
* Frontend React

Kemudian buka browser dan akses:

```text
http://localhost:5173
```

---

# 📂 Struktur Proyek

```text
Sportmybinigwh/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── database/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ☁️ Deployment

Aplikasi dirancang agar dapat di-deploy pada berbagai platform cloud modern seperti:

* Amazon Web Services (AWS)
* Google Cloud Platform (GCP)
* Microsoft Azure
* DigitalOcean
* Railway
* Render
* Vercel

Frontend dan Backend dapat di-deploy secara terpisah sesuai kebutuhan infrastruktur.

---

# 🔒 Keamanan

* API Key Xendit disimpan melalui file environment (.env).
* Secret key tidak disimpan pada source code.
* Pemisahan frontend dan backend meningkatkan keamanan aplikasi.
* Validasi data dilakukan sebelum pembuatan invoice pembayaran.
* Integrasi menggunakan SDK resmi Xendit.

---

# 👥 Tim Pengembang

* Muhammad Safril
* Muhammad Aril Andrian
* Jeremy Revaldo Latuperisa

---

# 📄 Lisensi

Proyek ini dikembangkan sebagai bagian dari tugas mata kuliah Cloud Computing Program Studi Ilmu Komputer Universitas Halu Oleo.
