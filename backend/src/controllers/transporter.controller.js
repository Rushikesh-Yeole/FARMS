const FarmerStock = require("../models/FarmerStock.js");
const mongoose = require("mongoose");
const requstStatus = require("../models/RequestStatus.model.js");
const Transporter = require("../models/TransportRequirements.js");
const client = require("../utils/twilioClient.js");
const User = require("../models/User.js");
const { getCoordinates } = require("../services/geocodingService.js");
const TransporterDetailsmodel = require("../models/tranportDetails.model.js")
const pendingTransporterModel = require("../models/pendingTransporter.model.js")



 
const TransporterDetails = async (req, res) => {
    try {
        const TransporterId = req.user._id;
        const { vehicleType, capacity, isColdStorageAvailable } = req.body;

        if (vehicleType === undefined || capacity === undefined || isColdStorageAvailable === undefined) {
            console.log("er")
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Fix: Use the correct model name (Transporter)
        const Details = await TransporterDetailsmodel.create({
            TransporterId,
            vehicle: {
                vehicleType,
                capacity,   
                isColdStorageAvailable,
            },
        });

        if (!Details) {
            return res.status(404).json({
                success: false,
                message: "Transporter details not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stored successfully",
            Details,
        });
    } catch (error) {
        console.error("Error storing transporter details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



const findNearbyTransportRequirements = async (longitude, latitude, maxDistanceKm = 40) => {
    try {
        const maxDistanceMeters = maxDistanceKm * 1000; 

        const results = await Transporter.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    distanceField: "distance",
                    maxDistance: maxDistanceMeters,
                    spherical: true,
                    key: "Departlocations.0.coordinates" 
                }
            },
            { $sort: { distance: 1 } } 
        ]);

        return results || [];
    } catch (error) {
        console.error("Error finding transport requirements:", error);
        return [];
    }
};

const getRequest = async (req, res) => {
    try {
        const transporterId = req.user._id; 

        const data = await Transporter.find({
            requestedTransporters: { $ne: transporterId }, 
        }).populate('FarmerIds', 'firstName lastName contactNumber');

        return res.status(200).json({
            success: true,
            message: data.length ? "Data retrieved successfully" : "No nearby transport found",
            data,
        });
    } catch (error) {
        console.error("Error in getRequest:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


const sendRequest = async (req, res) => {
    try {
        const Transporterid = req.user._id; // Get transporter ID from logged-in user
        const requirementId = req.query.requirementId;

        if (!requirementId || !mongoose.Types.ObjectId.isValid(requirementId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing transport requirement ID.",
            });
        }

        // Fetch requirement from the correct model
        const requirementDetails = await Transporter.findById(requirementId);

        if (!requirementDetails) {
            return res.status(404).json({
                success: false,
                message: "Requirement not found",
            });
        }

        // Create a pending request
        const pendingRequest = await pendingTransporterModel.create({
            Transporterid,
            Farmerid: requirementDetails.FarmerIds,
            Departlocation: requirementDetails.Departlocations,
            Destination: requirementDetails.Destination,
            DepatrureDate: requirementDetails.DepatrureDate, 
            quantities: requirementDetails.quantities,
            contactNumber: requirementDetails.contactNumber, 
        });

        if (!pendingRequest) {
            return res.status(400).json({
                success: false,
                message: "Error in uploading request",
            });
        }

        await Transporter.findByIdAndUpdate(
            requirementId,
            { $addToSet: { requestedTransporters: Transporterid } }, // Prevents duplicates
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Request sent successfully",
            pendingRequest,
        });

    } catch (error) {
        console.error("Error in sendRequest:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


const requstStatusfunction = async (req, res) => {
    try {
        const _transportRequirementId = req.query.transportrequirementid;

        if (!_transportRequirementId || !mongoose.Types.ObjectId.isValid(_transportRequirementId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing transport requirement ID.",
            });
        }

        const requirement = await Transporter.findById(_transportRequirementId);
        if (!requirement) {
            return res.status(404).json({
                success: false,
                message: "Transport requirement not found in the database.",
            });
        }

        const _transporterId = req.user._id;
        if (!_transporterId) {
            return res.status(401).json({
                success: false,
                message: "Please log in as a transporter to proceed.",
            });
        }

        const transporter = await User.findById(_transporterId);
        const _farmerId = requirement.FarmerIds;
        const farmer = await User.findById(_farmerId);

        if (!transporter || !farmer) {
            return res.status(404).json({
                success: false,
                message: "Transporter or farmer not found in the database.",
            });
        }

        const farmerContact = farmer.contactNumber;
        const transporterContact = transporter.contactNumber;

        const depart = requirement.Departlocations;
        const dest = requirement.Destination;

        if (!dest || !dest.place || !dest.coordinates) {
            return res.status(400).json({
                success: false,
                message: "Missing or incomplete location information.",
            });
        }

        const acceptance = await requstStatus.create({
            Transporterid: _transporterId,
            Farmerid: _farmerId,
            Departlocation: depart,
            Destination: dest,
            DepatrureDate: requirement.DepatrureDate,
            quantity: requirement.quantities,
        });

        await Transporter.deleteOne({ _id: _transportRequirementId });

        try {
            await client.messages.create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to: transporterContact,
                body: `Greetings from F.A.R.M.S! 
Your deal with Farmer ${farmer.firstName} ${farmer.lastName} is confirmed for the date ${requirement.DepatrureDate}. 
You can contact the farmer through the app.`,
            });

            await client.messages.create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to: farmerContact,
                body: `Greetings from F.A.R.M.S! 
Your deal with Transporter ${transporter.firstName} ${transporter.lastName} is confirmed for the date ${requirement.DepatrureDate}. 
You can contact the transporter through the app.`,
            });
        } catch (twilioError) {
            console.error("Twilio Error:", twilioError);
            return res.status(500).json({
                success: false,
                message: "Failed to send notification messages.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Deal is accomplished.",
            deal: acceptance,
        });
    } catch (error) {
        console.error("Error in requestStatusFunction:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
const getPendingreq = async (req, res) => {
    try {
        const myId = req.user._id;
        const requests = await pendingTransporterModel.find({ Transporterid: myId, completionFlag: false });

        if (requests.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No pending requests found",
            });
        }

        return res.status(200).json({
            success: true,
            data: requests,
        });

    } catch (error) {
        console.error("Error fetching pending requests:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
const getAcceptedRequest = async(req,res)=>{
    try {
        const myId = req.user._id;
        const requests = await pendingTransporterModel.find({ Transporterid: myId, completionFlag: true }).populate('Farmerid','firstName lastName contactNumber');

        if (requests.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no accepted request found requests found",
            });
        }

        return res.status(200).json({
            success: true,
            data: requests,
        });

    } catch (error) {
        console.error("Error fetching pending requests:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}



//  Fix: Export correctly
module.exports = { getRequest, requstStatusfunction,getPendingreq ,TransporterDetails,sendRequest,getAcceptedRequest};
