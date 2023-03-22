import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Balance = () => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const getBalances = async () => {
      const token = localStorage.getItem("_cashaacryptoAcessToken");
      const config = {
        headers: {
          'Authorization': `Basic ${token}`
        }
      };
      const response = await axios.get('https://staging-otc.cashaa.com/user/balance', config);
      setBalances(response.data);
    };

    getBalances();
  }, []);

  return (
    <div>
      <h2>Account Balance</h2>
      <ul>
        {Object.keys(balances).map((currency) => (
          <li key={currency}>
            {currency}: {balances[currency]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Balance;
