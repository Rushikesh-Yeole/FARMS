const { ItemAssignmentContextImpl } = require("twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment");
const mongoose = require('mongoose');
const { upload } = require("../middlewares/multer.middleware.js");
const FarmerStock = require("../models/FarmerStock.js");
const { uploadOnCloudinary } = require("../utils/uploadToCloudinary.js");
const TransporterDemand = require('../models/TransportRequirements.js')
const retailerDemands = require("../models/RetailerRequirements.js")
const {getCoordinates} = require("../services/geocodingService.js")
const {calculateByRoadDistance} = require("../services/distanceCalculator.js");
// const RetailerRequirements = require("../models/RetailerRequirements.js");
const User = require("../models/User.js")
const UserNotifications = require("../models/UserNotifications.js");
const Notifications = require("../models/Notifications.js")
const client = require("../utils/twilioClient");
const validator = require("validator");
const {calculateByRoadDistanceWithCoordinates} = require("../services/distanceCalcWithCoordinates.js")
// const {ConsumerRequirements} = require("../models/ConsumerRequirements.js")
const cron = require("node-cron");
const moment = require("moment");
const ConsumerRequirements = require("../models/ConsumerRequirements.js"); 
const perKmCost = require("../utils/transportCostCalculator.js")

const fetchMarketData = require("../utils/RealTimeCommodityPrice.js")

require("dotenv").config();

exports.postStock = async (req, res) => {
   try{
    const {cropname, cropgrade, quantity, location, contactNumber} = req.body;  //location should be comma separated village,district and state
    let {minExpectedPrice} = req.body;

    // let mktPrice = await fetchMarketData(location.district, cropname);
    // mktPrice = Number(mktPrice);
    // // console.log(mktPrice);

    // let perKgMktPrice = mktPrice / 100;

    // let highval = mktPrice + (0.2 * mktPrice);  //20% above mkt price
    // let perKgPrice = parseFloat(highval/100);
    // // console.log("Per kg: ", perKgPrice);

    // if(minExpectedPrice > perKgPrice){
    //     return res.status(400).json({
    //         success:false,
    //         message:`Price is too high. The current market price of ${cropname} is Rs. ${perKgMktPrice} per kg. Please enter a price less than 20% above the current market price (less than ${perKgPrice} per kg).`
    //     })
    // }

    
    const farmerDetails = req.user;

    if(!cropname || !cropgrade || !quantity || !location || !minExpectedPrice ){
        // console.log("err 1")
        return res.status(400).json({
            success:false,
            message:"All fields are required to post stock"
        });
    }

    minExpectedPrice = Number(minExpectedPrice);

    if(typeof minExpectedPrice !== "number"){
        return res.status(400).json({
            success:false,
            message:"Minimum expected price has to be a number."
        })
    }

    if(minExpectedPrice <= 0){
        return res.status(400).json({
            success:false,
            message:"Minimum expected price cannot be less than zero."
        })
    }

    const quantityValue = Number(quantity);     
    if (quantityValue <= 0) {
        return res.status(400).json({
            
            success: false,
            message: "Quantity must be a positive number",
        });
    }

    if (!validator.isMobilePhone(contactNumber, 'any')) {
        // console.log("err 3")
            return res.status(400).json({ error: "Invalid contact number" });
    }

    if(!req.file){
        // console.log("err 4")
        return res.status(400).json({
            success:false,
            message:"Req.file not found while posting stock"
        })
    }
    const image = req.file.path;
    if(!image){
        // console.log('err 5')
        return res.status(400).json({error:"Image is required"})
    }

    const uploadedImage = await uploadOnCloudinary(image);
    if (!uploadedImage || !uploadedImage.secure_url) {
        console.log("err 6")
        return res.status(500).json({
            success: false,
            message: "Failed to upload crop image to Cloudinary",
        });
    }
const finalLocation = `${location.village}, ${location.district}, ${location.state}`
    const locationcoordinates = await getCoordinates(finalLocation);   //!! FINAL_LOCATION
    if (!locationcoordinates) {
      return res.status(400).json({
        success: false,
        message: "Invalid location. Unable to retrieve coordinates.",
      });
    }
    // console.log(locationcoordinates);

    const longi  = locationcoordinates.lon;
    const lati  = locationcoordinates.lat;
    
    const newStock = await FarmerStock.create({
        userId: farmerDetails._id,
        crop: cropname, 
        cropGrade: cropgrade,
        quantity: quantity,
        minExpectedPrice: minExpectedPrice,
        image: uploadedImage.secure_url,
        location: {
            type:"Point",
            address:finalLocation,
            coordinates:[longi, lati]
        },
        contactNumber:contactNumber,
        pendingRetailerRequests:[],
        shopbuyers:[],
        directbuyers:[],
        sold:false
    });

    return res.status(200).json({
        success: true,
        stock:newStock,   //When stock is posted, pass the ID of the posted stock as query parameter (to be accessed when farmer clicks on "Request supply" on the BEST DEALS page)
        message: "Stock posted successfully!",
    });
   } catch(error){
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Error in posting stock",
    });
   }
};


//MASTER STROKE !
exports.viewBestDeals = async (req, res) => {
    try {
        const { farmerStockId } = req.query;
        const farmerStock = await FarmerStock.findById(farmerStockId);
        const { crop, cropGrade, location } = farmerStock;

        if (!crop || !cropGrade || !location) {
            return res.status(400).json({ success: false, message: "Crop, crop grade, and location are required." });
        }

        //clubbed requests of shopkeepers
        const matchedGroups = await retailerDemands.aggregate([
            { $match: { locked: false, crop : crop, cropGrade:cropGrade } },
            { $lookup:{
                from:"User",
                localField:"userId",
                foreignField:"_id",
                as:"retailerInfo"
            }},
            { $unwind: { path: "$retailerInfo", preserveNullAndEmptyArrays: true } },
            { $group: {
                _id: "$groupId",    
                totalQuantity: { $sum: "$quantity" },
                avgPrice: { $avg: "$pricePerQuintal" },
                avgGroupRating: { $avg: { $ifNull: ["$retailerInfo.averageRating", 0] } },
                retailers: { $push: "$$ROOT" } } }  
        ]);

        if (matchedGroups.length === 0) {
            return res.status(404).json({ success: false, message: "No matches found." });
        }

        const farmerCoordinates = location.coordinates;
        const k1 = 0.7, k2 = 0.15, k3 = 0.15;

        const deals = await Promise.all(matchedGroups.map(async (group) => {
            const {totalQuantity} = group;

            if(totalQuantity > farmerStock.quantity){
                return null;
            }

            const distances = await Promise.all(group.retailers.map(async (retailer) => {
                return calculateByRoadDistanceWithCoordinates(retailer.location.coordinates, farmerCoordinates);
            }));

            const minDistance = Math.min(...distances);
            const maxDistance = Math.max(...distances);

            if (typeof maxDistance !== "number" || isNaN(maxDistance)) return null;
            if (typeof minDistance !== "number" || isNaN(minDistance)) return null;

            let distanceTravelled = maxDistance*2;
            let perKmCostValue = await perKmCost(totalQuantity);
            let transportCost = distanceTravelled * perKmCostValue;

            const profitMargin = (group.avgPrice * group.totalQuantity) - transportCost;
            const groupRating = group.avgGroupRating;
            if(groupRating == null){
                groupRating = 0;
            }
            const dealScore = parseFloat((k1 * profitMargin - k2 * maxDistance + k3 * groupRating).toFixed(2));
            
            return { groupId: group._id, dealScore, profitMargin, minDistance, maxDistance, groupRating, group };
        }));

        const filteredDeals = deals.filter((item) => item !== null);

        filteredDeals.sort((a, b) => b.dealScore - a.dealScore);

        return res.status(200).json({ success: true, message: "Best deals found!", filteredDeals });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error finding best deals." });
    }
};


//REAL LIFE SCENARIO
//In a hurry to sell your crop ? Find the best deals near you !
exports.viewBestDealsInRange = async (req, res) => {
    try{
        const {farmerStockId} = req.query;
        const farmerStock = await FarmerStock.findById(farmerStockId);

        const {crop, cropGrade, location} = farmerStock;  
        const {maxdist} = req.body;

        // maxdist = Number(maxdist);

        if(maxdist <= 0 || typeof(maxdist) !== "number"){
            return res.status(400).json({
                success:false,
                message:"The range should be a positive number."
            })
        }

        //north to south distance of India is ~3200km
        if(maxdist > 3300){
            return res.status(400).json({
                success:false,
                message:"Too large range. Enter a smaller value."
            })
        }

        if(!crop || !cropGrade || !location){
            return res.status(400).json({
                success:false,
                message:"To view best deals near you, crop, cropgrade, location and range are required fields"
            })
        }


        const matchedGroups = await retailerDemands.aggregate([
            { $match: { locked: false, crop : crop, cropGrade:cropGrade } },
            { $lookup:{
                from:"User",
                localField:"userId",
                foreignField:"_id",
                as:"retailerInfo"
            }},
            { $unwind: { path: "$retailerInfo", preserveNullAndEmptyArrays: true } },
            { $group: {
                _id: "$groupId",
                totalQuantity: { $sum: "$quantity" },
                avgPrice: { $avg: "$pricePerQuintal" },
                avgGroupRating: { $avg: { $ifNull: ["$retailerInfo.averageRating", 0] } },
                retailers: { $push: "$$ROOT" } } }  
        ]);

        if (matchedGroups.length === 0) {
            return res.status(404).json({ success: false, message: "No matches found." });
        }

        const farmerCoordinates = farmerStock.location.coordinates;

        const k1 = 0.7, k2 = 0.15, k3 = 0.15;

        const deals = await Promise.all(
            matchedGroups.map(async (group) => {

                const {totalQuantity} = group;

                if(totalQuantity > farmerStock.quantity){
                    return null;
                }

                const distances = await Promise.all(group.retailers.map(async (retailer) => {
                    return calculateByRoadDistanceWithCoordinates(retailer.location.coordinates, farmerCoordinates);
                }));

                const minDistance = Math.min(...distances);
                const maxDistance = Math.max(...distances);

                //keeping a buffer of 10km
                if (typeof maxDistance !== "number" || isNaN(maxDistance) || maxDistance > maxdist + 5) return null;
                if (typeof minDistance !== "number" || isNaN(minDistance)) return null;

                const quantityRequired = group.totalQuantity;
                const priceOffered = group.avgPrice;
                const groupRating = group.avgGroupRating;
                if(groupRating == null){
                    groupRating = 0;
                }
                
                let distanceTravelled = maxDistance*2;
                let perKmCostValue = await perKmCost(totalQuantity);
                let transportCost = distanceTravelled * perKmCostValue;

                const profitMargin = (priceOffered * quantityRequired) - transportCost;

                const dealScore = parseFloat(
                    (k1 * profitMargin - k2 * maxDistance + k3 * groupRating).toFixed(2)
                );


                //Return an object for every demand. Array of objects will be created.
                return { groupId: group._id, dealScore, profitMargin, minDistance, maxDistance, groupRating, group };
            })
        );

        const validDeals= deals.filter((item) => item !== null);

        // console.log(validDemandsWithScores);

        if(validDeals.length === 0){
            return res.status(404).json({
                success:false,
                message:`No matches found for the uploaded crop within ${maxdist} km. Please try again later.`
            })
        }
        
        validDeals.sort((a,b) => {
            return b.dealScore - a.dealScore;
        })

        return res.status(200).json({
            success:true,
            message:`Checkout the MOST PROFITABLE DEALS within range of ${maxdist} km !`,
            validDeals  //Use day.js for formatting the date from YYYY-MM-DD to DD-MM-YYYY 
            /*// Install day.js via npm
            // npm install dayjs
            const dayjs = require('dayjs');

            const backendDate = "2025-01-27";
            const formattedDate = dayjs(backendDate).format('DD-MM-YYYY');
            console.log(formattedDate); // Outputs: 27-01-2025
            */
        })
         
    } catch(error){
        console.error("Error finding deals within range:", error);
        return res.status(500).json({
            success: false,
            message: "Error in finding the best deals within the given range.",
        });
    }
}


//When farmer clicks on "Request supply" on the BEST DEALS page
exports.requestTheGroupOfShopkeepers = async (req, res) => {
    try {
        const { groupId, farmerStockId, maxDistance } = req.body;  // Read from request body

        const groupOfDemands = await retailerDemands.find({ groupId });
        if (!groupOfDemands || groupOfDemands.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        const farmerStock = await FarmerStock.findById(farmerStockId).populate('userId', 'averageRating reliabilityScore');

        if (!farmerStock) {
            return res.status(400).json({ success: false, message: "Invalid Farmer Stock ID" });
        }

        const { minExpectedPrice } = farmerStock;
        const { averageRating, reliabilityScore } = farmerStock.userId;

        const k1 = 0.55, k2 = 0.25, k3 = 0.1, k4 = 0.1;
        const dealScore = (k1 * (-minExpectedPrice)) + (k2 * reliabilityScore) - (k3 * maxDistance) + (k4 * averageRating);

        for (let demand of groupOfDemands) {
            await retailerDemands.updateOne(
                { _id: demand._id },
                { $push: { pendingRequests: { farmerStockId, dealScore } } }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Request submitted successfully!"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in requesting the group of shopkeepers for supply."
        });
    }
};



//In profile, when farmer clicks on "View Allocated Deals" button
exports.viewAllocatedDeals = async (req, res) => {
    try{

        const farmerId = req.user._id;

        const farmerInfo = await User.findById(farmerId).select('allocatedDeals');
        if (!farmerInfo) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found."
            });
        }

        const {allocatedDeals} = farmerInfo;  //array which stores groupIds
        
        if(!allocatedDeals || allocatedDeals.length === 0){
            return res.status(200).json({
                success:true,
                message:"No deals have been allocated to you yet."
            })
        }

        return res.status(200).json({
            success:true,
            message:"Allocated deals fetched successfully",
            allocatedDeals
        })

    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in fetching allocated deals for farmer."
        })
    }
}


exports.viewShopkeepersInAllocatedDeal = async (req, res) => {
    try{
        const {groupId} = req.query;

        const allShopkeepers = await retailerDemands.find({groupId}).select('location quantity contactNumber pricePerQuintal');

        if(!allShopkeepers || allShopkeepers.length === 0){
            return res.status(200).json({
                success:false,
                message:"No shopkeepers found for this deal."
            })
        }

        return res.status(200).json({
            success:true,
            message:"Shopkeepers fetched successfully",
            allShopkeepers
        })

    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in fetching shopkeepers info in the allocated deal."
        })
    }
}



//-------------------------------------------------------------------------------------------

exports.viewFarmerNotifications = async (req, res) => {
    try{
        const {myId} = req.query;  //get it from payload

        const allNotifications = await UserNotifications.find({userId: myId}).populate('notification');

        if(!allNotifications || allNotifications.length === 0){
            return res.status(200).json({
                success:true,
                message:"No notifications pending."
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"Farmer notifications fetched successfully.",
            allNotifications
        })

    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in fetching farmer notifications."
        })
    }
}


exports.viewMyStock = async (req, res) => {
    try {
          //Farmer is logged in, so we can get _id from payload
        const farmerId = req.user._id;
        const myStock = await FarmerStock.find({ userId: farmerId }).sort({createdAt: -1});  //newest first

        if (!myStock || myStock.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No stocks posted yet.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Farmer stocks fetched successfully.",
            stocks: myStock, 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching stocks posted by farmer.",
        });
    }
};


//DELETE NOTIFICATION FROM RR


exports.requestTransport = async(req,res)=>{
    //middlewares will check for is farmer uploading or authenticated
    //then farmer will provide information of crop
    //validate user information then upload it to database
    const {departLocation,deliveryLocation,dateOfJourney,capacity} = req.body;
    if(!departLocation || !deliveryLocation || !dateOfJourney || !capacity){
        return res.status(402).json({
            success: false,
            message: "please provide all Information ",

        })
    }
    const farmerDetails = req.user;
    if(!farmerDetails){
        return res.status(402).json({
            message:"farmer doesnt exist",
            success:"false",
        })
    }
    const FarmRequest = await TransporterDemand.create({
        departLocation,
        deliveryLocation,
        dateOfJourney,
        capacity,
        userId:farmerDetails._id
    })

    if(!FarmRequest){
        return res.status(402).json({
            success:false,
            message:"Error in uploading to database",
        })
    }
    return res.status(201).json({
        requestTransport:FarmRequest,
        success:true,
        message:"requestes successfully"
    })

}

exports.viewBestConsumerDeals = async (req, res) => {
    try {
        const { farmerStockId } = req.query;
        const farmerStock = await FarmerStock.findById(farmerStockId);
        if(!farmerStock){
            return res.status(404).json({
                success:false,
                message:"Farmer stock not found."
            })
        }
        const { crop, cropGrade, location, minExpectedPrice } = farmerStock;

        if (!crop || !cropGrade || !location) {
            return res.status(400).json({ success: false, message: "Crop, crop grade, and location are required." });
        }

        const matchedGroups = await ConsumerRequirements.aggregate([
            { $match: { locked: false, crop: crop, cropGrade: cropGrade } },
            { $lookup: {
                from: "User",
                localField: "userId",
                foreignField: "_id",
                as: "consumerInfo"
            }},
            { $unwind: { path: "$consumerInfo", preserveNullAndEmptyArrays: true } },
            { $group: {
                _id: "$groupId",    
                totalQuantity: { $sum: "$quantity" },
                avgGroupRating: { $avg: { $ifNull: ["$consumerInfo.averageRating", 0] } },
                consumers: { $push: "$$ROOT" } } }  
        ]);

        if (matchedGroups.length === 0) {
            return res.status(400).json({ success: false, message: "No matches found." });
        }

        const farmerCoordinates = location.coordinates;
        const k1 = 0.7, k2 = 0.15, k3 = 0.15;

        const deals = await Promise.all(matchedGroups.map(async (group) => {
            const { totalQuantity } = group;
            if (totalQuantity > farmerStock.quantity) return null;

            const distances = await Promise.all(group.consumers.map(async (consumer) => {
                return calculateByRoadDistanceWithCoordinates(consumer.location.coordinates, farmerCoordinates);
            }));

            const minDistance = Math.min(...distances);
            const maxDistance = Math.max(...distances);

            let distanceTravelled = maxDistance*2;
            let perKmCostValue = await perKmCost(totalQuantity);
            let transportCost = distanceTravelled * perKmCostValue;


            if (isNaN(maxDistance) || isNaN(minDistance)) return null;
            const profitMargin = (minExpectedPrice * group.totalQuantity) - transportCost;
            const groupRating = group.avgGroupRating || 0;
            const dealScore = parseFloat((k1 * profitMargin - k2 * maxDistance + k3 * groupRating).toFixed(2));
            
            return { groupId: group._id, dealScore, profitMargin, minDistance, maxDistance, groupRating, group };
        }));

        const filteredDeals = deals.filter((item) => item !== null);
        filteredDeals.sort((a, b) => b.dealScore - a.dealScore);

        return res.status(200).json({ success: true, message: "Best consumer deals found!", filteredDeals });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error finding best consumer deals." });
    }
};

exports.viewBestConsumerDealsInRange = async (req, res) => {
    try {
        const { farmerStockId } = req.query;
        const { maxdist } = req.body;
        const farmerStock = await FarmerStock.findById(farmerStockId);
        const { crop, cropGrade, location, minExpectedPrice } = farmerStock;

        if (maxdist <= 0 || typeof maxdist !== "number") {
            return res.status(400).json({ success: false, message: "The range should be a positive number." });
        }

        if (maxdist > 3300) {
            return res.status(400).json({ success: false, message: "Too large range. Enter a smaller value." });
        }

        if (!crop || !cropGrade || !location) {
            return res.status(400).json({ success: false, message: "Required fields missing." });
        }

        const matchedGroups = await ConsumerRequirements.aggregate([
            { $match: { locked: false, crop: crop, cropGrade: cropGrade } },
            { $lookup: {
                from: "User",
                localField: "userId",
                foreignField: "_id",
                as: "consumerInfo"
            }},
            { $unwind: { path: "$consumerInfo", preserveNullAndEmptyArrays: true } },
            { $group: {
                _id: "$groupId",
                totalQuantity: { $sum: "$quantity" },
                
                avgGroupRating: { $avg: { $ifNull: ["$consumerInfo.averageRating", 0] } },
                consumers: { $push: "$$ROOT" } } }  
        ]);

        if (matchedGroups.length === 0) {
            return res.status(404).json({ success: false, message: "No matches found." });
        }

        const farmerCoordinates = farmerStock.location.coordinates;
        const k1 = 0.7, k2 = 0.15, k3 = 0.15;

        const deals = await Promise.all(matchedGroups.map(async (group) => {
            const distances = await Promise.all(group.consumers.map(async (consumer) => {
                return calculateByRoadDistanceWithCoordinates(consumer.location.coordinates, farmerCoordinates);
            }));

            const maxDistance = Math.max(...distances);
            if (maxDistance > maxdist + 5) return null;

            let distanceTravelled = maxDistance*2;
            let perKmCostValue = await perKmCost(totalQuantity);
            let transportCost = distanceTravelled * perKmCostValue;


            const profitMargin = (minExpectedPrice * group.totalQuantity) - transportCost;
            const groupRating = group.avgGroupRating || 0;
            const dealScore = parseFloat((k1 * profitMargin - k2 * maxDistance + k3 * groupRating).toFixed(2));
            
            return { groupId: group._id, dealScore, profitMargin, maxDistance, groupRating, group };
        }));

        const validDeals = deals.filter((item) => item !== null);
        if (validDeals.length === 0) {
            return res.status(404).json({ success: false, message: `No matches found within ${maxdist} km.` });
        }

        validDeals.sort((a, b) => b.dealScore - a.dealScore);

        return res.status(200).json({ success: true, message: `Best deals within ${maxdist} km`, validDeals });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error finding best consumer deals within range." });
    }
};

exports.requestTheGroupOfConsumers = async (req, res) => {
    try {
        const { groupId,farmerStockId, maxDistance } = req.body;
        // const { farmerStockId, maxDistance } = req.query;

        const groupOfDemands = await ConsumerRequirements.find({ groupId });
        if (!groupOfDemands || groupOfDemands.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        const farmerStock = await FarmerStock.findById(farmerStockId).populate('userId', 'averageRating reliabilityScore');

        if (!farmerStock) {
            return res.status(400).json({ success: false, message: "Invalid Farmer Stock ID" });
        }

        const { minExpectedPrice } = farmerStock;
        const { averageRating, reliabilityScore } = farmerStock.userId;

        const k1 = 0.55, k2 = 0.25, k3 = 0.1, k4 = 0.1;
        const dealScore = (k1 * (-minExpectedPrice)) + (k2 * reliabilityScore) - (k3 * maxDistance) + (k4 * averageRating);

        for (let demand of groupOfDemands) {
            
            await ConsumerRequirements.updateOne(
                { _id: demand._id },
                { $push: { pendingRequests: { farmerStockId, dealScore } } }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Request submitted successfully!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in requesting the group of consumers for supply."
        });
    }
};

exports.viewConsumersInAllocatedDeal = async (req, res) => {
    try {
        const { groupId } = req.query;

        const allConsumers = await ConsumerRequirements.find({ groupId }).select('location quantity contactNumber pricePerUnit');

        if (!allConsumers || allConsumers.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No consumers found for this deal."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Consumers fetched successfully",
            allConsumers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching consumer info in the allocated deal."
        });
    }
};
