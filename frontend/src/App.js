import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/api/flight-prices', {
        params: { origin, destination, departDate, returnDate }
      });
      setFlightData(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching flight prices:', error);
      setError('Failed to fetch flight prices. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Flight Price Finder</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Origin:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter origin (e.g., MOW)"
            required
          />
        </label>

        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination (e.g., HKT)"
            required
          />
        </label>

        <label>
          Departure Date:
          <input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            required
          />
        </label>

        <label>
          Return Date:
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </label>

        <button type="submit">Find Flights</button>
      </form>

      {flightData && flightData.data && flightData.data[destination] && (
        <div className="flight-result">
          <h2>Flight Results:</h2>
          <ul>
            {Object.keys(flightData.data[destination]).map((key) => (
              <li key={key}>
                <strong>Airline:</strong> {flightData.data[destination][key].airline} <br />
                <strong>Departure Time:</strong> {new Date(flightData.data[destination][key].departure_at).toLocaleString()} <br />
                <strong>Return Time:</strong> {new Date(flightData.data[destination][key].return_at).toLocaleString()} <br />
                <strong>Price:</strong> {flightData.data[destination][key].price} {flightData.currency} <br />
                <strong>Flight Number:</strong> {flightData.data[destination][key].flight_number} <br />
                <strong>Expires At:</strong> {new Date(flightData.data[destination][key].expires_at).toLocaleString()} <br />
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
