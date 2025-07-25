import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinTable from '../components/CoinTable';

const CurrentCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coins');
        setCoins(response.data);
      } catch (err) {
        console.error('Error fetching coins:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="p-3">
      {loading ? <p>Loading...</p> : <CoinTable coins={coins} />}
    </div>
  );
};

export default CurrentCoins;
