const mongoose = require('mongoose');
const { getCoordinates } = require("../services/geocodingService.js");
const FarmerStock = require('../models/FarmerStock.js');
const consumerDemands = require("../models/ConsumerRequirements.js");
const UserNotifications = require("../models/UserNotifications.js");
const Notifications = require("../models/Notifications.js");
const client = require("../utils/twilioClient");
const User = require("../models/User.js");
require("dotenv").config();
const validator = require("validator");

exports.postRequirement = async (req, res) => {
    try {
        const { crop, cropGrade, quantity, location, expectedDeliveryDate, contactNumber } = req.body;
        const consumerID = req.user._id;

        if (!crop || !cropGrade || !quantity || !location || !contactNumber) {
            
            return res.status(400).json({ success: false, message: "All fields are required for posting crop requirements." });
        }

        const finalLocation = `${location.city}, ${location.district}, ${location.state}`;
        if (!expectedDeliveryDate || isNaN(new Date(expectedDeliveryDate))) {
            
            return res.status(400).json({ success: false, message: "A valid expected delivery date is required." });
        }

        const deliveryDate = new Date(expectedDeliveryDate);
        if (deliveryDate < new Date()) {
            
            return res.status(400).json({ success: false, message: "Expected delivery date cannot be in the past." });
        }

        if (quantity <= 0) {
            
            return res.status(400).json({ success: false, message: "Quantity must be positive values." });
        }

        const locationCoordinates = await getCoordinates(finalLocation);
        if (!locationCoordinates) {
            console.log("error in thi")
            return res.status(400).json({ success: false, message: "Invalid location. Unable to retrieve coordinates." });
        }
        const [longi, lati] = [locationCoordinates.lon, locationCoordinates.lat];

        let existingGroup = await consumerDemands.findOne({
            crop,
            cropGrade,
            expectedDeliveryDate,
            locked: false,
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [longi, lati] },
                    $maxDistance: 5000
                }
            }
        });

        let groupId = existingGroup ? existingGroup.groupId : new mongoose.Types.ObjectId();

        const displayAddress = `${location.apartment},${location.areaName}, ${location.city}, ${location.district}, ${location.state}`;

        const newRequirement = await consumerDemands.create({
            userId: consumerID,
            crop,
            cropGrade,
            quantity,
            location: {
                type: "Point",
                address: displayAddress,
                landmark: location.landmark,
                coordinates: [longi, lati]
            },
            expectedDeliveryDate: deliveryDate,
            groupId,
            pendingRequests: [],
            locked: false
        });

        return res.status(200).json({ success: true, message: "Requirement posted successfully.", newRequirement });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error posting stock requirement." });
    }
};

exports.viewNotifications = async (req, res) => {
    try {
        // const { myId } = req.query;
        const myId = req.user._id;
        const allNotifications = await UserNotifications.find({ userId: myId }).populate('notification');

        if (!allNotifications || allNotifications.length === 0) {
            return res.status(200).json({ success: true, message: "No notifications pending." });
        }

        return res.status(200).json({ success: true, message: "Consumer notifications fetched successfully.", allNotifications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error in fetching consumer notifications." });
    }
};

exports.viewMyOrders = async (req, res) => {
    try {
        const consumerId = req.user._id;
        const myOrders = await consumerDemands.find({ userId: consumerId }).sort({ createdAt: -1 });

        if (!myOrders || myOrders.length === 0) {
            return res.status(200).json({ success: false, message: "No orders posted yet." });
        }

        return res.status(200).json({ success: true, message: "My orders fetched successfully", myOrders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error in fetching consumer orders." });
    }
};

exports.viewSupplierOfOrder = async (req, res) => {
    try {
        const { consumerRequirementId } = req.query;
        const consumerRequirement = await consumerDemands.findById(consumerRequirementId).select('bestFarmerStockId');

        if (!consumerRequirement) {
            return res.status(404).json({ success: false, message: "Consumer requirement not found for fetching supplier" });
        }
        const farmerStockId = consumerRequirement.bestFarmerStockId;

        if (!farmerStockId) {
            return res.status(200).json({ success: true, message: "No farmer has been allocated for this order yet." });
        }
 
        const farmerStock = await FarmerStock.findById(farmerStockId).select('userId location').populate('userId', 'firstName lastName contactNumber averageRating reliabilityScore');

        const { firstName, lastName, contactNumber, averageRating, reliabilityScore } = farmerStock.userId;
        const farmerAddress = farmerStock.location.address

        return res.status(200).json({
            success: true,
            message: "Supplier for this order fetched successfully.",
            firstName, lastName, contactNumber, averageRating, reliabilityScore, farmerAddress
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error in fetching suppliers for this order." });
    }
};
