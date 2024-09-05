import React, { useState } from 'react';




function BitcoinPriceChecker() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [prices, setPrices] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:8080/api/bitcoin-price?startDate=${startDate}&endDate=${endDate}&currency=${currency}`)
      .then(response => response.json())
      .then(data => setPrices(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div>
      <h2>Bitcoin Price Checker</h2>
      <form onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </select>
        <button type="submit">Fetch Prices</button>
      </form>

      {prices.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((priceData, index) => (
              <tr key={index}>
                <td>{priceData.date}</td>
                <td>{priceData.price}</td>
                <td>{priceData.highest ? 'Highest' : priceData.lowest ? 'Lowest' : ''}</td>
                <td>{currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BitcoinPriceChecker;
