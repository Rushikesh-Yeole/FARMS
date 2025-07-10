const { getCoordinates } = require('./geocodingService');
const { getByRoadDistance } = require('./routingService');

// Function to calculate by-road distance
async function calculateByRoadDistance(location1, location2) {
  if (!location1 || !location2) {
    throw new Error('Both locations are required');
  }

  try {
    const coord1 = await getCoordinates(location1);
    const coord2 = await getCoordinates(location2);

    const distance = await getByRoadDistance(coord1, coord2);

    // Return distance as a float with two decimal places
    return parseFloat(distance.toFixed(2));
    
  } catch (error) {
    console.error('Error in calculating the distance:', error.message);
    throw new Error('Error calculating by-road distance. Please try again.');
  }
}

module.exports = {
  calculateByRoadDistance,
};
