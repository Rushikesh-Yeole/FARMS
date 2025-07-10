
const {getByRoadDistanceWithCoordinates} = require('./routingServiceWithCoordinates')

// Function to calculate by-road distance
async function calculateByRoadDistanceWithCoordinates(coord1, coord2) {
    if(!coord1 || coord1.length !== 2){
        throw new Error("Invalid coordinates of retailer.")
    }
    if(!coord2 || coord2.length !== 2){
        throw new Error("Invalid coordinates of farmer.")
    }
    

  try {

    const distance = await getByRoadDistanceWithCoordinates(coord1, coord2);  

    // Return distance as a float with two decimal places
    return parseFloat(distance.toFixed(2));
    
  } catch (error) {
    console.error('Error in calculating the distance:', error.message);
    throw new Error('Error calculating by-road distance. Please try again.');
  }
}

module.exports = {
    calculateByRoadDistanceWithCoordinates
};
