
async function perKmCost(weight){
    //weight is in kg
    if(weight <= 1500){
        //chota hatti
        return 15;
    }
    else if(weight <= 3000){
        //Pickup
        return 25;
    }
    else if(weight <= 10000){
        //407 tempo
        return 31.6;
    }
    else if(weight <= 16000){
        //eicher
        return 41.6;
    }
    else{
        //truck -> capacity 20,000 kg
        return 66.66;
    }
}

module.exports = perKmCost;