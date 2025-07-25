import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CoinTable from './components/CoinTable';
import Loader from './components/Loader';
import History from './pages/History';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CoinHistoryChart from './components/CoinHistoryChart';
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const result = await axios.get('http://localhost:5000/api/coins');
      setCoins(result.data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 1800000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <Router>
      <Header onToggleSidebar={toggleSidebar} />
      <div className="d-flex bg-dark text-light" style={{ minHeight: '100vh' }}>
        <Sidebar show={showSidebar} onHide={() => setShowSidebar(false)} />
        <main className="flex-fill p-4">
          <Routes>
            <Route path="/" element={loading ? <Loader /> : <CoinTable coins={coins} />} />
            <Route path="/history" element={<CoinHistoryChart coinId="bitcoin" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
