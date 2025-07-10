const mongoose = require('mongoose');
// const RetailerRequirements = require("../models/RetailerRequirements")
const { getCoordinates } = require("../services/geocodingService.js")
const FarmerStock = require('../models/FarmerStock.js');
const retailerDemands = require("../models/RetailerRequirements.js");
const UserNotifications = require("../models/UserNotifications.js");
const Notifications = require("../models/Notifications.js");
const client = require("../utils/twilioClient");
const User = require("../models/User.js");
require("dotenv").config()
const validator = require("validator");
const fetchMarketData = require("../utils/RealTimeCommodityPrice.js")

exports.postRequirement = async (req, res) => {
    try {
        //Also take apartment and areaName, but use only city district and state for coordinates
        const { crop, cropGrade, quantity, price, location, expectedDeliveryDate, contactNumber } = req.body;
        const retailerID = req.user._id;

        if (!crop || !cropGrade || !quantity || !price || !location ) {
            console.log("error in this")
            return res.status(400).json({ success: false, message: "All fields are required for posting crop requirements." });
        }

        

        

        const finalLocation = `${location.village}, ${location.district}, ${location.state}`;
        // console.log(finalLocation);
        if (!expectedDeliveryDate || isNaN(new Date(expectedDeliveryDate))) {
            return res.status(400).json({ success: false, message: "A valid expected delivery date is required." });
        }

        const deliveryDate = new Date(expectedDeliveryDate);
        if (deliveryDate < new Date()) {
            return res.status(400).json({ success: false, message: "Expected delivery date cannot be in the past." });
        }

        if (quantity <= 0 || price <= 0) {
            return res.status(400).json({ success: false, message: "Quantity and price per quintal must be positive values." });
        }

        const locationCoordinates = await getCoordinates(finalLocation);
        if (!locationCoordinates) {
            return res.status(400).json({ success: false, message: "Invalid location. Unable to retrieve coordinates." });
        }
        const [longi, lati] = [locationCoordinates.lon, locationCoordinates.lat];

        let existingGroup = await retailerDemands.findOne({
            crop,
            cropGrade,
            expectedDeliveryDate,
            locked:false,
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [longi, lati] },
                    $maxDistance: 5000
                }
            }
        });

        let groupId = existingGroup ? existingGroup.groupId : new mongoose.Types.ObjectId();

        const displayAddress = `${location.areaName}, ${location.village}, ${location.district}, ${location.state}`;

        const newRequirement = await retailerDemands.create({
            userId: retailerID,
            crop,
            cropGrade,
            pricePerQuintal: price,
            quantity,
            location: {
                type: "Point",
                address: displayAddress,
                landmark:location.landmark,
                coordinates: [longi, lati]
            },
            expectedDeliveryDate: deliveryDate,
            groupId,
            pendingRequests: [],
            locked:false
        });

        return res.status(200).json({ success: true, message: "Requirement posted successfully.", newRequirement });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error posting stock requirement." });
    }
};

exports.viewNotifications = async (req, res) => {
    try {

        const { myId } = req.user._id;  //get it from payload


        const allNotifications = await UserNotifications.find({ userId: myId }).populate('notification');

        if (!allNotifications || allNotifications.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No notifications pending."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Retailer notifications fetched successfully.",
            allNotifications
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching retailer notifications."
        })
    }
}


exports.viewMyOrders = async (req, res) => {
    try {

        const  retailerId  = req.user._id;  //Retailer is logged in, so we can get _id from payload

        const myOrders = await retailerDemands.find({ userId: retailerId }).sort({ createdAt: -1 });

        if (!myOrders || myOrders.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No orders posted yet."
            })
        }

        return res.status(200).json({
            success: true,
            message: "My orders fetched successfully",
            myOrders
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching retailer orders."
        })
    }
}


//When clicked on "View suppliers" of a particular order in "View my orders"
exports.viewSupplierOfOrder = async (req, res) => {
    try {

        const { retailerRequirementId } = req.query;

        const retailerRequirement = await retailerDemands
            .findById(retailerRequirementId)
            .select('bestFarmerStockId');

            
            
            if (!retailerRequirement) {
                return res.status(404).json({
                    success: false,
                    message: "Retailer requirement not found for fetching supplier"
                })
            }
            const farmerStockId = retailerRequirement.bestFarmerStockId;

            if(!farmerStockId){
                return res.status(200).json({
                    success:true,
                    message:"No farmer has been allocated for this order yet."
                })
            }
            
        const farmerStock = await FarmerStock.findById(farmerStockId).select('userId').populate('userId', 'firstName lastName contactNumber averageRating reliabilityScore')

        const {firstName, lastName, contactNumber, averageRating, reliabilityScore} = farmerStock.userId;
        const farmerAddress = farmerStock.location.address

        return res.status(200).json({
            success: true,
            message: "Supplier for this order fetched successfully.",
            firstName, lastName, contactNumber, averageRating, reliabilityScore, farmerAddress
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching suppliers for this order."
        })
    }
}



exports.deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.body; // From the "All notifications" page
        const { myId } = req.query; //user is logged in, so we can get this from payload

        if (!notificationId || !myId) {
            return res.status(400).json({
                success: false,
                message: "Missing notificationId or myId."
            });
        }

        const updatedUserNotification = await UserNotifications.findOneAndUpdate(
            { userId: myId },
            { $pull: { notification: notificationId } },
            { new: true }
        );

        if (!updatedUserNotification) {
            return res.status(404).json({
                success: false,
                message: "User notification record not found or notification not present."
            });
        }

        const deletedNotification = await Notifications.findByIdAndDelete(notificationId);

        if (!deletedNotification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting notification."
        });
    }
};


// exports.getStock = async(req,res)=>{
//     //1.check for authentication and is user retailer using middleweres
//     //2. get all stocks from poststock database
//     //3.only send usaefull data to a retailer
//     const StockData = await FarmerStock.find({});
//     return res.status(201).json({
//         StockData
//     })
// }
