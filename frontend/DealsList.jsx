import React, { useEffect, useState } from 'react';

function DealsList() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/deals')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setDeals(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Snapdeal Deals</h2>
      <ul>
        {deals.map((deal, index) => (
          <li key={index}>
            <a href={deal.url} target="_blank" rel="noopener noreferrer">
              {deal.name}
            </a> — {deal.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DealsList;
