import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CoinTable from '../components/CoinTable';
import Loader from '../components/Loader';
import CoinHistoryChart from '../components/CoinHistoryChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const DashboardLayout = ({ children, loading, coins, showSidebar, toggleSidebar, hideSidebar }) => (
  <div className="App app-container">
    <div className="d-flex flex-column flex-grow-1 w-100">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="d-flex flex-grow-1" style={{ backgroundColor: '#0d1117', color: '#fff' }}>
        <Sidebar show={showSidebar} onHide={hideSidebar} />
        <main className="flex-fill p-4">
          {children}
        </main>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
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
  const hideSidebar = () => setShowSidebar(false);

  return (
    <DashboardLayout
      loading={loading}
      coins={coins}
      showSidebar={showSidebar}
      toggleSidebar={toggleSidebar}
      hideSidebar={hideSidebar}
    >
      <Routes>
        <Route path="" element={loading ? <Loader /> : <CoinTable coins={coins} />} />
        <Route path="history" element={<CoinHistoryChart coinId="bitcoin" />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
