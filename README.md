
# 🚀 Crypto Dashboard – Developer Test (VR Automations) | Created Using PERN (Postgresql,Express,ReactJs,NodeJs)

This is a full-stack crypto dashboard project built for the VR Automations developer test. It displays real-time and historical cryptocurrency data using CoinGecko API, Postgresql, Node.js, React, and Chart.js. It includes a backend cron job for fetching and storing data every hour.

---

## 🌐 Live Demo

- **Frontend:** http://13.201.249.52/
- **Backend API Base URL:** http://13.201.249.52/api/
  - `/api/coins` – Get all current coins
  - `/api/history/:coinId` – Get historical data of a coin
  - `/api/history?coinIds=bitcoin,ethereum,...` – Multiple coins’ historical chart

---

## 📂 Tech Stack

| Layer     | Tech Used               |
|-----------|--------------------------|
| Frontend  | React.js, Bootstrap, Axios, Chart.js |
| Backend   | Node.js, Express.js, MongoDB, Mongoose |
| Scheduler | node-cron (via PM2) |
| Database  | Postgresql (hosted on EC2) |
| Hosting   | EC2 Ubuntu 22.04, Nginx Reverse Proxy, PM2 |
| API Source| CoinGecko Public API |

---

## ⚙️ How to Run Locally

### 📦 Clone and Setup

```bash
git clone https://github.com/vicky87883/cryptotrack.git
cd crypto
```

### 🚀 Backend (Node + MongoDB)

```bash
cd server
npm install
node index.js   # or pm2 start index.js --name backend
```

Ensure `.env` has:
```env
MONGO_URI=mongodb://localhost:27017/crypto-dashboard
PORT=5000
```

### 💻 Frontend (React)

```bash
cd client
npm install
npm start    # or npm run build for production
```

---

## ⏱️ Cron Job

The backend uses `node-cron` to fetch data from CoinGecko every **minute** and save:

- Coin prices to `coins` collection
- Historic prices to `history` collection

> PM2 is used to keep the backend process running on the server.

### 💻 PM2 Commands

```bash
pm2 list              # check process
pm2 logs backend      # view cron output
pm2 restart backend   # restart server
```

---

## 🖼️ Screenshots

### 📊 MongoDB Data
- `coins` collection with latest prices
- `history` collection with minute-wise price tracking

### ⏱️ Cron Logs
- Output logs via `pm2 logs` showing fetch/save intervals

---

## 📁 Project Structure

```
crypto-dashboard/
├── client/         # React frontend
│   └── src/
│       └── components/
│           ├── History.js
│           └── CoinHistoryChart.js
├── server/         # Express backend
│   └── routes/
│       ├── coins.js
│       └── history.js
│   └── services/cron.js
├── .env
└── README.md
```

---

## ✅ API Endpoints

| Method | Endpoint                           | Description |
|--------|------------------------------------|-------------|
| GET    | `/api/coins`                       | Get all current coin prices |
| GET    | `/api/history/:coinId`             | Get historical prices for a coin |
| GET    | `/api/history?coinIds=bitcoin,...` | Get historical chart for multiple coins |

---

## ✅ Deployment Details

| Layer     | Info |
|-----------|------|
| Instance  | EC2 Ubuntu |
| Domain/IP | http://13.201.249.52 |
| Nginx     | Reverse proxy for React frontend + proxy `/api` to backend |
| MongoDB   | Running locally on EC2 instance |
| Backend   | Running via `pm2` as `backend` service |

---

## ✅ Final Deliverables (As per Test Instructions)

- ✅ Live App on EC2
- ✅ MongoDB with historical data
- ✅ Running Cron Job via PM2
- ✅ GitHub repo with full code
- ✅ This README
- ✅ Screenshots (MongoDB + Cron logs)

---

## 🔚 Thank You

Looking forward to your feedback and next steps!
