const axios = require('axios');
require("dotenv").config();

// Function to get by-road distance using OpenRouteService
async function getByRoadDistance(coord1, coord2) {
  const apiKey = process.env.ORS_API_KEY; // Your ORS API key

  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

  try {
    const response = await axios.post(
      url,
      {
        coordinates: [
          [coord1.lon, coord1.lat],
          [coord2.lon, coord2.lat],
        ],
      },
      {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
      }
    );


    const distance = response.data.routes[0].summary.distance / 1000; // Distance in kilometers
    
    return distance;
  } catch (error) {
    console.error('Error fetching by-road distance:', error.message);
    throw new error;
  }
}

module.exports = {
  getByRoadDistance,
};
