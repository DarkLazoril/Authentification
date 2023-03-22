import React, { useState } from 'react';
import axios from 'axios';

const CreateAddressForm = () => {
  const [currency, setCurrency] = useState('');
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://staging-otc.cashaa.com/api/b2b/address/Create',
        {
          currency: currency,
          label: label
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CASHAA_API_KEY}`
          }
        }
      );

      setAddress(response.data.address);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="currency">Currency:</label>
        <input
          type="text"
          id="currency"
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="label">Label:</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
      </div>
      <button type="submit">Create Address</button>
      {address && <p>New Address: {address}</p>}
    </form>
  );
};

export default CreateAddressForm;
