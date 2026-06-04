# 🌊 Smart Drainase Monitoring System

> Sistem Monitoring Drainase Berbasis Internet of Things (IoT) untuk Deteksi Dini Potensi Banjir dan Pelaporan Masyarakat.

## 📖 Deskripsi

Smart Drainase Monitoring System merupakan platform berbasis Internet of Things (IoT) yang dirancang untuk membantu masyarakat dan petugas dalam memantau kondisi drainase secara real-time.

Sistem ini mengintegrasikan perangkat sensor berbasis ESP32, website monitoring, dan Bot Telegram untuk memberikan informasi kondisi drainase secara cepat, akurat, dan mudah diakses.

Selain monitoring otomatis menggunakan sensor, sistem juga menyediakan fitur pelaporan masyarakat sehingga warga dapat berpartisipasi aktif dalam melaporkan permasalahan drainase seperti penyumbatan, sampah, genangan air, maupun kerusakan infrastruktur.

---

## 📌 Latar Belakang

Banjir perkotaan sering terjadi akibat buruknya kondisi drainase yang tidak terpantau dengan baik. Proses monitoring dan pelaporan yang masih dilakukan secara manual menyebabkan informasi sering terlambat diterima oleh pihak terkait.

Melalui Smart Drainase Monitoring System, proses pemantauan dapat dilakukan secara real-time dan laporan masyarakat dapat dikelola secara terpusat sehingga penanganan masalah drainase menjadi lebih cepat dan efektif.

---

## 🎯 Tujuan Proyek

* Memantau kondisi drainase secara real-time.
* Memberikan notifikasi dini terhadap potensi banjir.
* Mempermudah petugas dalam memonitor kondisi drainase.
* Menyediakan media pelaporan bagi masyarakat.
* Menyimpan data historis untuk analisis dan evaluasi.

---

## 🏗️ Arsitektur Sistem

```text
┌─────────────────┐
│ Sensor Ultrasonik │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      ESP32      │
└────────┬────────┘
         │ HTTP API
         ▼
┌─────────────────┐
│    Web Server   │
└────────┬────────┘
         │
 ┌───────┴────────┐
 ▼                ▼
Website      Telegram Bot
Dashboard     Notification
```

---

## ⚙️ Teknologi yang Digunakan

### Hardware

* ESP32
* Sensor Ultrasonik HC-SR04
* Breadboard
* Kabel Jumper
* Power Supply

### Frontend

* Next.js
* React.js
* Tailwind CSS
* Leaflet Maps
* Chart.js

### Backend

* Next.js API Route
* Supabase
* Postgresql

### IoT

* ESP32
* HTTP Request
* REST API

### Notification

* Telegram Bot API

---

## ✨ Fitur Utama

### 📊 Monitoring Drainase Real-Time

* Monitoring ketinggian air secara langsung.
* Pembaruan data otomatis.
* Informasi status drainase terkini.

### 🚨 Sistem Status Drainase

| Status     | Keterangan                     |
| ---------- | ------------------------------ |
| 🟢 Aman    | Kondisi normal                 |
| 🟡 Waspada | Ketinggian air mulai meningkat |
| 🔴 Bahaya  | Potensi banjir                 |

### 🗺️ Peta Monitoring

* Menampilkan lokasi titik drainase.
* Penanda warna sesuai kondisi drainase.
* Memudahkan identifikasi titik rawan.

### 🤖 Notifikasi Telegram

* Peringatan otomatis saat kondisi berubah.
* Informasi lokasi dan waktu kejadian.
* Monitoring tanpa harus membuka website.

### 📝 Sistem Pelaporan Masyarakat

* Membuat laporan kondisi drainase.
* Upload foto bukti.
* Melihat status laporan.
* Riwayat laporan pengguna.

### 🛠️ Manajemen Laporan

* Verifikasi laporan oleh admin.
* Persetujuan atau penolakan laporan.
* Fitur revisi laporan yang ditolak.
* Monitoring progres penanganan laporan.

### 📈 Riwayat dan Statistik

* Penyimpanan data historis.
* Grafik perubahan ketinggian air.
* Analisis kondisi drainase.

---

## 🔄 Alur Kerja Sistem

### Monitoring Sensor

1. Sensor ultrasonik membaca ketinggian air.
2. ESP32 mengolah data sensor.
3. Data dikirim ke server melalui API.
4. Data disimpan ke database.
5. Dashboard diperbarui secara real-time.
6. Telegram mengirim notifikasi apabila status berubah menjadi Waspada atau Bahaya.

### Pelaporan Masyarakat

1. Pengguna membuat laporan.
2. Sistem menyimpan laporan dan foto bukti.
3. Admin melakukan verifikasi.
4. Laporan dapat diterima atau ditolak.
5. Jika ditolak, pengguna dapat melakukan revisi.
6. Status laporan dapat dipantau melalui website.

---

## 🗄️ Struktur Database

### User

* id
* name
* email
* password
* role

### Report

* id
* title
* description
* image
* status
* createdAt

### Drainage

* id
* location
* waterLevel
* status

### MonitoringHistory

* id
* drainageId
* waterLevel
* timestamp

---

## 📷 Tampilan Sistem

### Dashboard Monitoring

```md
![Dashboard](./public/dashboard.png)
```

### Monitoring Peta

```md
![Map](./public/map.png)
```

### Telegram Notification

```md
![Telegram](./public/telegram.png)
```

### Sistem Pelaporan

```md
![Report](./public/report.png)
```

---

## 🚀 Instalasi dan Menjalankan Proyek

### Clone Repository

```bash
git clone https://github.com/username/smart-drainase-monitoring.git
```

### Masuk ke Folder

```bash
cd smart-drainase-monitoring
```

### Install Dependency

```bash
npm install
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Migrasi Database

```bash
npx prisma migrate dev
```

### Jalankan Aplikasi

```bash
npm run dev
```

Website akan berjalan pada:

```bash
http://localhost:3000
```

---

## 👨‍💻 Tim Pengembang

### Argazora

* IoT Developer
* Manajer Proyek
  
### Fathur

* Fullstack Developer
* UI/UX Designer

### Rislam

* Devops Engineering
  
### Geo

* Mechatronics Engineer

### Nelma

* Team Support

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran, penelitian, dan pengembangan sistem monitoring drainase berbasis Internet of Things (IoT).

---

## 🌟 Kontribusi

Kontribusi, masukan, dan saran sangat terbuka untuk pengembangan sistem yang lebih baik di masa mendatang.
