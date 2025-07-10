const axios = require('axios');
require("dotenv").config();

// Function to get by-road distance using OpenRouteService
async function getByRoadDistanceWithCoordinates(coord1, coord2) {
  const apiKey = process.env.ORS_API_KEY; // Your ORS API key

  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

  try {
    const response = await axios.post(
      url,
      {
        coordinates: [
          coord1,  //coord1 is an array
          coord2,  //coord2 is an array
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
    getByRoadDistanceWithCoordinates,
};
