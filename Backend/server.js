const axios = require('axios');

const client_id = 'ZzLSDsLtWErGY4lQtTalAfh0j7VttyBC';
const client_secret = 'LD2h3z3EYYg15huE';

const getToken = async () => {
  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: client_id,
        client_secret: client_secret,
      }), 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    console.log('Token:', response.data);
  } catch (error) {
    console.error('Error fetching token:', error.response ? error.response.data : error.message);
  }
};

getToken();
