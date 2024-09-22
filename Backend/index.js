const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route to fetch cheap flight prices
app.get('/api/flight-prices', async (req, res) => {
  const { origin, destination, departDate, returnDate } = req.query;
  
  const API_TOKEN = '398b588f67f2416ad9fac7a2c1145e01'; // Replace with your actual TravelPayouts API token

  try {
    // Make the request to TravelPayouts API
    const response = await axios.get('https://api.travelpayouts.com/v1/prices/cheap', {
      params: {
        origin: origin || 'MOW',                // Default origin is MOW (Moscow)
        destination: destination || 'HKT',      // Default destination is HKT (Phuket)
        depart_date: departDate || '2024-11',   // Default departure date
        return_date: returnDate || '2024-12',   // Default return date
        token: API_TOKEN
      }
    });

    // Return the response data to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flight prices:', error.message);
    res.status(500).json({ error: 'Failed to fetch flight prices' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
