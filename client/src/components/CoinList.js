import React from 'react';

const CoinList = ({ coins }) => {
  return (
    <>
      {coins.map((coin) => (
        <tr key={coin.id}>
          <td>{coin.name}</td>
          <td>{coin.symbol}</td>
          <td>${coin.current_price.toLocaleString()}</td>
          <td>${coin.market_cap.toLocaleString()}</td>
          <td>{coin.price_change_percentage_24h?.toFixed(2)}%</td>
          <td>{new Date().toLocaleString()}</td>
        </tr>
      ))}
    </>
  );
};

export default CoinList;
