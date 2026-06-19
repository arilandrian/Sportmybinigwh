# 🏟️ Sportmybinigwh

Sportmybinigwh adalah platform *booking* (penyewaan) lapangan olahraga (futsal, badminton, tenis) modern dengan antarmuka yang elegan bergaya *WHOOP-style* dan sudah terintegrasi secara langsung dengan sistem pembayaran instan **Xendit**.

## 📋 Persyaratan Sistem (System Requirements)

Bagi Anda (atau developer lain) yang ingin menjalankan, memodifikasi, atau menggunakan aplikasi ini di komputer lokal, berikut adalah persyaratannya:

### 1. Kebutuhan Perangkat Lunak (Software)
* **Node.js**: Versi 18.x atau yang lebih baru (Disarankan menggunakan versi LTS terbaru). Anda bisa mengunduhnya di [nodejs.org](https://nodejs.org/).
* **NPM**: Biasanya sudah satu paket (ter-install otomatis) saat Anda meng-install Node.js. Versi 8.x ke atas disarankan.
* **Git**: Digunakan untuk mengkloning repositori ini (opsional jika mendownload via zip). [git-scm.com](https://git-scm.com/)
* **Code Editor**: Visual Studio Code (sangat disarankan) atau editor kode lainnya.

### 2. Kebutuhan Layanan Pihak Ketiga
* **Akun Xendit**: Anda wajib memiliki akun Xendit yang sudah aktif (cukup mode Test/Sandbox) untuk memproses API pembuatan Invoice Pembayaran. Daftar di [xendit.co](https://www.xendit.co/).

---

## 🚀 Cara Instalasi & Menjalankan Aplikasi

Aplikasi ini dibagi menjadi dua bagian: **Frontend** (Tampilan/React) dan **Backend** (API/Express). Keduanya harus dijalankan secara bersamaan.

### Langkah 1: Clone & Setup Awal
Buka terminal Anda dan jalankan perintah berikut:
```bash
# Clone repositori
git clone https://github.com/arilandrian/Sportmybinigwh.git
cd Sportmybinigwh
```

### Langkah 2: Setup Backend (API)
Buka terminal baru untuk setup Backend:
```bash
# Masuk ke folder backend
cd backend

# Install semua dependencies yang dibutuhkan
npm install
```

**Konfigurasi Environment Backend:**
1. Buat sebuah file baru bernama `.env` di dalam folder `backend`.
2. Buka dashboard Xendit Anda, masuk ke **Settings > Developers > API Keys**, lalu generate *Secret Key* baru (harus memiliki akses *WRITE* untuk *Money-In/Invoice*).
3. Salin format di bawah ini ke dalam file `.env` Anda:
```env
XENDIT_SECRET_KEY=xnd_development_KEY_ANDA_DISINI
FRONTEND_URL=http://localhost:5173
PORT=5000
```
4. Jalankan server Backend:
```bash
npm run dev
```
*(Backend akan berjalan di `http://localhost:5000`)*

### Langkah 3: Setup Frontend (UI Website)
Buka terminal baru (biarkan terminal backend tetap berjalan):
```bash
# Masuk ke folder frontend
cd frontend

# Install semua dependencies yang dibutuhkan
npm install

# Jalankan server Frontend
npm run dev
```
*(Frontend akan berjalan di `http://localhost:5173`)*

### Langkah 4: Buka Aplikasi
Buka browser favorit Anda (Chrome, Firefox, Safari) lalu kunjungi alamat:
👉 **http://localhost:5173**

---

## 🛠️ Teknologi yang Digunakan
* **Frontend**: React.js, Vite, React Router DOM, Pure CSS (Tanpa Tailwind/Bootstrap).
* **Backend**: Node.js, Express.js, UUID.
* **Payment Gateway**: Xendit Node SDK.
* **Database**: JSON File System (sebagai mock database MVP).
