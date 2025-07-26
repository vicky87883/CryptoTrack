
# 🚀 Crypto Dashboard – Developer Test (VR Automations) | Created Using PERN (PostgreSQL, Express, ReactJS, NodeJS)

This is a full-stack crypto dashboard project built for the VR Automations developer test. It displays real-time and historical cryptocurrency data using CoinGecko API, PostgreSQL, Node.js, React, and Chart.js. It includes a backend cron job for fetching and storing data every hour.

---

## 🌐 Live Demo

- **Frontend:** http://13.201.249.52/
- **Backend API Base URL:** http://13.201.249.52/api/
  - `/api/coins` – Get all current coins
  - `/api/history/:coinId` – Get historical data of a coin
  - `/api/history?coinIds=bitcoin,ethereum,...` – Multiple coins’ historical chart

---

## 📂 Tech Stack

| Layer     | Tech Used                           |
|-----------|--------------------------------------|
| Frontend  | React.js, Bootstrap, Axios, Chart.js |
| Backend   | Node.js, Express.js, PostgreSQL      |
| Scheduler | node-cron (via PM2)                  |
| Database  | PostgreSQL (hosted on EC2)           |
| Hosting   | EC2 Ubuntu 22.04, Nginx Reverse Proxy, PM2 |
| API Source| CoinGecko Public API                 |

---

## ⚙️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/vicky87883/cryptotrack.git
cd crypto-dashboard
```

### 🚀 Backend (Node + PostgreSQL)

```bash
cd server
npm install
node index.js   # or pm2 start index.js --name backend
```

Ensure `.env` has:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/crypto_db
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

The backend uses `node-cron` to fetch data from CoinGecko every **hour** and save:

- Coin prices to `coins` table
- Historic prices to `history` table

> PM2 is used to keep the backend process running on the server.

### 💻 PM2 Commands

```bash
pm2 list              # check process
pm2 logs backend      # view cron output
pm2 restart backend   # restart server
```

---

## 🖼️ Screenshots
<img width="1179" height="649" alt="cron-job-snapshot-db-1min-test-purpose" src="https://github.com/user-attachments/assets/f5bbc453-23bf-4354-ab13-04c4a2441246" />
<img width="1209" height="675" alt="latest-coin-fetch-snapshot" src="https://github.com/user-attachments/assets/d08890ba-3854-4049-8abf-dfe141230480" />

### 📊 PostgreSQL Data
- `coins` table with latest prices
- `history` table with minute-wise price tracking

### ⏱️ Cron Logs
- Output logs via `pm2 logs` showing fetch/save intervals

---

## 📁 Project Structure

```
crypto-track/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Coin.js
│   │   │   ├── CoinHistoryChart.js
│   │   │   ├── CoinList.js
│   │   │   ├── CoinTable.js
│   │   │   ├── Header.js
│   │   │   ├── Loader.js
│   │   │   └── SearchBar.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   ├── index.css
│   │   └── ...
│   └── package.json
│
├── server/                    # Express backend
│   ├── config/
│   │   └── config.json
│   ├── migrations/
│   │   ├── 20250723141548-create-coins.js
│   │   ├── 20250723141615-create-coinhistory.js
│   │   ├── 20250723160114-add-timestamps-to-coinhistory.js
│   │   └── migrations_create_coinhistory.js
│   ├── models/
│   │   ├── Coin.js
│   │   ├── CoinHistory.js
│   │   ├── create-coinhistory-fixed.js
│   │   └── index.js
│   ├── routes/
│   │   └── coinRoutes.js
│   ├── .env
│   ├── server.js
│   ├── cron.js
│   ├── package.json
│   └── package-lock.json

```

---

## ✅ API Endpoints

| Method | Endpoint                           | Description                           |
|--------|------------------------------------|---------------------------------------|
| GET    | `/api/coins`                       | Get all current coin prices           |
| GET    | `/api/history/:coinId`             | Get historical prices for a coin      |
| GET    | `/api/history?coinIds=bitcoin,...` | Get historical chart for multiple coins |

---

## ✅ Deployment Details

| Layer     | Info                             |
|-----------|----------------------------------|
| Instance  | EC2 Ubuntu                       |
| Domain/IP | http://13.201.249.52             
| Nginx     | Reverse proxy for React frontend + proxy `/api` to backend |
| PostgreSQL| Running locally on EC2 instance  |
| Backend   | Running via `pm2` as `backend` service |

---

## ✅ Final Deliverables (As per Test Instructions)

- ✅ Live App on EC2
- ✅ PostgreSQL with historical data
- ✅ Running Cron Job via PM2
- ✅ GitHub repo with full code
- ✅ This README
- ✅ Screenshots (PostgreSQL + Cron logs)

---

## 🔚 Thank You
