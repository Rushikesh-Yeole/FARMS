const axios = require('axios');

// Function to get coordinates using Nominatim
async function getCoordinates(location) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;

  try {
    const response = await axios.get(url);
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  } 
}

async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&format=json`;

  try {
      const response = await axios.get(url);
      if (response.data) {
          console.log('Reverse Geocode Result:', response.data);
          return response.data;
      } else {
          console.log('No result found for the coordinates:', lat, lon);
          return {err:"error in loading "}
      }
  } catch (error) {
      console.error('Error during reverse geocoding:', error.message);
  }
}
module.exports = {
  getCoordinates,reverseGeocode
};
