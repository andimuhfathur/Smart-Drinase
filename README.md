# 🌊 Smart Drainase Monitoring System

Smart Drainase Monitoring System adalah sistem monitoring drainase berbasis Internet of Things (IoT) yang dirancang untuk membantu pemantauan kondisi saluran drainase secara real-time.

Sistem ini mengintegrasikan ESP32, sensor ultrasonik, Bot Telegram, dan Website Monitoring untuk memberikan informasi kondisi drainase serta notifikasi dini ketika terjadi potensi banjir.

---

## 📌 Latar Belakang

Pemantauan drainase di banyak daerah masih dilakukan secara manual sehingga sering terjadi keterlambatan dalam mengetahui kondisi saluran yang berpotensi menyebabkan banjir.

Melalui proyek ini, kondisi drainase dapat dipantau secara real-time melalui website dan sistem dapat mengirimkan peringatan otomatis kepada petugas atau masyarakat.

---

## 🎯 Tujuan Proyek

- Memantau kondisi drainase secara real-time.
- Memberikan peringatan dini terhadap potensi banjir.
- Memudahkan petugas dalam memonitor drainase tanpa harus datang ke lokasi.
- Menyediakan data historis untuk analisis kondisi drainase.

---

## 🏗️ Arsitektur Sistem

```text
Sensor Ultrasonik
        │
        ▼
      ESP32
        │
        ▼
     API Server
        │
 ┌──────┴──────┐
 ▼             ▼
Website     Telegram Bot
Dashboard   Notification
```

---

## ⚙️ Teknologi yang Digunakan

### Hardware

- ESP32
- Sensor Ultrasonik HC-SR04
- Breadboard
- Kabel Jumper
- Power Supply

### Software

#### Frontend

- Next.js
- React.js
- Tailwind CSS
- Leaflet Maps

#### Backend

- Next.js API Route
- Prisma ORM
- MySQL

#### IoT

- ESP32
- HTTP API

#### Notification

- Telegram Bot API

---

## ✨ Fitur Utama

### Monitoring Real-time

- Menampilkan kondisi drainase secara langsung.
- Menampilkan status:
  - Aman
  - Waspada
  - Bahaya

### Dashboard Monitoring

- Informasi drainase terkini.
- Grafik perubahan ketinggian air.
- Riwayat monitoring.

### Peta Lokasi

- Menampilkan titik drainase pada peta.
- Indikator warna berdasarkan kondisi drainase.

### Telegram Notification

- Notifikasi otomatis ketika status berubah.
- Informasi kondisi dan waktu kejadian.

### Sistem Pelaporan Masyarakat

- Membuat laporan kondisi drainase.
- Upload foto bukti.
- Tracking status laporan.
- Riwayat laporan pengguna.

### Manajemen Laporan

- Verifikasi laporan.
- Persetujuan atau penolakan laporan.
- Fitur revisi laporan yang ditolak.

---

## 🔄 Alur Kerja Sistem

1. Sensor ultrasonik membaca tinggi permukaan air.
2. ESP32 mengolah data sensor.
3. Data dikirim ke server melalui API.
4. Server menyimpan data ke database.
5. Website memperbarui informasi monitoring.
6. Jika status Waspada atau Bahaya:
   - Telegram Bot mengirim notifikasi otomatis.
7. Petugas dapat melihat kondisi melalui dashboard.

---

## 📷 Tampilan Sistem

### Dashboard

Tambahkan screenshot dashboard di sini.

```md
![Dashboard](./public/dashboard.png)
```

### Monitoring Peta

Tambahkan screenshot peta di sini.

```md
![Map](./public/map.png)
```

### Telegram Notification

Tambahkan screenshot Telegram di sini.

```md
![Telegram](./public/telegram.png)
```

---

## 🗄️ Database

Beberapa entitas utama:

### User

- id
- name
- email
- role

### Report

- id
- title
- description
- image
- status

### Drainage

- id
- location
- waterLevel
- status

### Monitoring History

- id
- drainageId
- waterLevel
- timestamp

---

## 🚀 Cara Menjalankan Project

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

### Setup Environment

Buat file `.env`

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

### Generate Prisma

```bash
npx prisma generate
```

### Migrasi Database

```bash
npx prisma migrate dev
```

### Jalankan Project

```bash
npm run dev
```

---

## 📊 Status Drainase

| Status | Keterangan |
|----------|----------|
| 🟢 Aman | Kondisi normal |
| 🟡 Waspada | Ketinggian air meningkat |
| 🔴 Bahaya | Potensi banjir |

---

## 👨‍💻 Tim Pengembang

**A. Muh. Fathur Ramadhan**

Rekayasa Perangkat Lunak

SMKN 2 Makassar

---

## 📄 Lisensi

Project ini dibuat untuk keperluan penelitian, pembelajaran, dan pengembangan sistem monitoring drainase berbasis IoT.
