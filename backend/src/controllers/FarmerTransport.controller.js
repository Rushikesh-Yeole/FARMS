const TransporterDemand = require('../models/TransportRequirements')
const {getCoordinates} = require('../services/geocodingService.js')
const FarmerStock = require("../models/FarmerStock");
const mongoose = require('mongoose');
const client = require('../utils/twilioClient.js');
const Notification = require('../models/notification.model.js');
const pendingRequest = require('../models/pendingTransporter.model.js')
// const TransporterDemand = require('../models/TransportRequirements.model.js')
const requestTransport = async (req, res) => {
    try {
        const { departLocation, deliveryLocation, dateOfJourney, quantity } = req.body;
        if(!departLocation || !deliveryLocation || !dateOfJourney || !quantity){
          console.log("this is error")
          return res.status(400).json({
            success:"false",
            messege:"this is error"
          })
        }
        const finaldepartLocation = `${departLocation.village} ${departLocation.district} ${departLocation.state}`
        const finaldeliveryLocation = `${deliveryLocation.village} ${deliveryLocation.district} ${deliveryLocation.state}`
        const departCords = await getCoordinates(finaldepartLocation);
        const deliveryCords = await getCoordinates(finaldeliveryLocation);
        if(!departCords || !deliveryCords){
            return res.status(501).json({
                err:"error in fetching"
            })
        }


        const farmerDetails = req.user; // Extract FarmerId from authentication middleware
        if (!farmerDetails) {
            return res.status(401).json({
                success: false,
                message: "Farmer does not exist or is not authenticated.",
            });
        }

        const FarmRequest = await TransporterDemand.create({
            FarmerIds: farmerDetails._id,
            Departlocations:{
                place:finaldepartLocation,
                coordinates:[departCords.lat,departCords.lon]
            },
            Destination:{
                place:finaldeliveryLocation,
                coordinates:[deliveryCords.lat,deliveryCords.lon]
            },
            DepatrureDate: new Date(dateOfJourney),
            quantities:quantity,
        });
        if(!FarmRequest){
          return res.status(500).json({
            success:"false",
            messege:"post not updated in database"
          })
        }
        console.log(FarmRequest)
        return res.status(201).json({
            success: true,
            message: "Request submitted successfully.",
            requestTransport: FarmRequest,
        });
    } catch (error) {
        console.error("Error processing transport request:", error);
        return res.status(500).json({
            success: false,
            message: "An internal server error occurred.",
        });
    }
};

const tranportReqfarmer = async (req, res) => {
    try {
      const _myRequirementId = req.query.transportrequirementid;
  
      if (!_myRequirementId || !mongoose.Types.ObjectId.isValid(_myRequirementId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing transport requirement ID.",
        });
      }
  
      const myInfo = await TransporterDemand.findById(_myRequirementId);
      if (!myInfo) {
        return res.status(404).json({
          success: false,
          message: "Transport demand not found.",
        });
      }
  
      // Define `getdemands` function
      const getdemands = async (departureCoordinates, destinationCoordinates, excludeId) => {
        return await TransporterDemand.aggregate([
          {
            // `$geoNear` must be the first stage in the pipeline
            $geoNear: {
              near: { type: "Point", coordinates: departureCoordinates },
              distanceField: "distanceToDeparture",
              maxDistance: 40000, // Distance in meters
              spherical: true,
            },
          },
          {
            $match: {
              _id: { $ne: new mongoose.Types.ObjectId(excludeId) }, // Exclude the given ID
            },
          },
          {
            $match: {
              "Destination.coordinates": destinationCoordinates, // Match destination
            },
          },
        ]);
      };
  
      // Get demands
      const demands = await getdemands(
        myInfo.Departlocations[0].coordinates, // Assuming Departlocations is an array
        myInfo.Destination.coordinates,
        _myRequirementId
      );
  
      if (!demands || demands.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No matching transport demands found.",
        });
      }
  
      // Successful response
      return res.status(200).json({
        success: true,
        data: demands,
      });
    } catch (err) {
      console.error("Error in processing:", err);
      return res.status(500).json({
        success: false,
        message: "An internal server error occurred.",
      });
    }
  };
  

  const reqFarmer = async (req, res) => {
    try {
      const _RequirementId = req.query.requstId;
      const _myrequirementId = req.query._myRequirementId;
  
      // Validate IDs
      if (!_myrequirementId || !mongoose.Types.ObjectId.isValid(_myrequirementId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing transport requirement ID (_myRequirementId).",
        });
      }
      if (!_RequirementId || !mongoose.Types.ObjectId.isValid(_RequirementId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing transport requirement ID (_RequirementId).",
        });
      }
  
      // Authenticate user
      const _requesterId = req.user?._id;
      if (!_requesterId) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated.",
        });
      }
  
      // Fetch requester data
      const requesterDataInfo = await TransporterDemand.findById(_myrequirementId);
      if (!requesterDataInfo) {
        return res.status(404).json({
          success: false,
          message: "Requester data not found.",
        });
      }
  
      //Send SMS using Twilio
      
      requesterDataInfo.contactNumber.map(async(ele)=>{
        await client.messages.create({
          from: process.env.TWILIO_PHONE_NUMBER,
          to: ele,
          body:`Greetings from F.A.R.M.S!
  We are thrilled to share that our farmer friend
  is interested in sharing their trip with you.
  If you allow it, this could be beneficial for both parties.
  If you are interested, please accept the invitation.`
        })

      })
  
      // Fetch receiver data
      const receiver = await TransporterDemand.findById(_RequirementId);
      if (!receiver) {
        return res.status(404).json({
          success: false,
          message: "Receiver data not found.",
        });
      }
    
      // Create notification
      const notify = await Notification.create({
        _senderId: _requesterId,
        _receiverId: receiver.FarmerIds, // Ensure this is compatible with your Notification schema
        message: `Greetings from F.A.R.M.S!
  We are thrilled to share that our farmer friend
  is interested in sharing their trip with you.
  If you allow it, this could be beneficial for both parties.
  If you are interested, please accept the invitation.`,
        _farmerRequirementId: _RequirementId,
        _senderFarmerRequirementId: _myrequirementId,
      });
  
      if (!notify) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload notifications.",
        });
      }
    
      // Success response
      return res.status(200).json({
        success: true,
        notification: notify,
        message: "Notification sent successfully.",
      });
    } catch (err) {
      console.error("Error in reqFarmer:", err);
      return res.status(500).json({
        success: false,
        message: "An internal server error occurred.",
      });
    }
  };
  

  const getNotifications = async (req, res) => {
    try {
      const userId = req.user._id;
      if (!userId) {
        return res.json({
          message: "Error occurred in authentication",
          success: false
        });
      }
  
      // Use the $in operator to check if the userId exists in the _receiverId array
      const myNotifications = await Notification.find({
        _receiverId: { $in: [userId] }
      });
      
      
  
      return res.json({
        success: true,
        notifications: myNotifications
      });
    } catch (err) {
      console.log("An internal server error occurred", err);
      return res.json({
        message: "Internal server error",
        success: false
      });
    }
  };
  
  const acceptRequest = async (req, res) => {
    try {
        // 1. Get requirement ID from query
        const _acceptId = req.query.notif_id;

        if (!_acceptId || !mongoose.Types.ObjectId.isValid(_acceptId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing transport requirement ID (_acceptId).",
            });
        }

        // 2. Fetch notification
        const notify = await Notification.findById(_acceptId);
        if (!notify) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        // 3. Collect Farmer IDs
        const FarmerIds = [...(notify._receiverId || []), notify._senderId];
        if (FarmerIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Farmer IDs not found.",
            });
        }

        // 4. Fetch both requirements
        const _farmreq1 = await TransporterDemand.findById(notify._farmerRequirementId);
        const _farmreq2 = await TransporterDemand.findById(notify._senderFarmerRequirementId);

        if (!_farmreq1 || !_farmreq2) {
            return res.status(404).json({
                success: false,
                message: "One or both requirements not found.",
            });
        }

        // 5. Merge data
        const Departlocations = [..._farmreq1.Departlocations, ..._farmreq2.Departlocations];
        const Destination = _farmreq2.Destination;
        const DepartureDate = _farmreq2.DepartureDate;
        const contactNumber = [..._farmreq1.contactNumber, ..._farmreq2.contactNumber];
        const quantities = [..._farmreq1.quantities, ..._farmreq2.quantities];

        if (!Destination || !DepartureDate || !contactNumber.length || !quantities.length) {
            return res.status(400).json({
                success: false,
                message: "Required data is missing.",
            });
        }

        // 6. Create new request
        const newRequest = await TransporterDemand.create({
            FarmerIds,
            Departlocations,
            Destination,
            DepartureDate,
            quantities,
            contactNumber,
        });

        if (!newRequest) {
            return res.status(500).json({
                success: false,
                message: "Failed to create the new request.",
            });
        }

        // 7. Delete old requirements
        await TransporterDemand.findByIdAndDelete(_farmreq1._id);
        await TransporterDemand.findByIdAndDelete(_farmreq2._id);

        return res.status(201).json({
            success: true,
            message: "New request created successfully.",
            newRequest,
        });
    } catch (err) {
        console.error("An internal server error occurred:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};


const myRequestFeed = async (req, res) => {
  try {
    const farmerId = req.user._id; // Get logged-in farmer's ID

    // Find all transport requests where the given farmerId exists in the FarmerIds array
    const requests = await TransporterDemand.find({ FarmerIds: { $in: [farmerId] } });

    if (!requests.length) {
      return res.status(404).json({ message: "No transport requests found for this farmer" });
    }

    res.status(200).json(requests); 
  } catch (error) {
    console.error("Error fetching transport requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const acceptRequestTransporter = async (req, res) => {
  try {
      const FarmerId = req.user._id;
      const transporterRequestId = req.query.transporterRequestId;

      // Validate transporterRequestId
      if (!transporterRequestId || !mongoose.Types.ObjectId.isValid(transporterRequestId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid or missing pending request ID.",
          });
      }

      // Update request status
      const acceptance = await pendingRequest.findByIdAndUpdate(
          transporterRequestId,
          { completionFlag: true },
          { new: true } // Ensure the updated document is returned
      );

      if (!acceptance) {
          return res.status(404).json({
              success: false,
              message: "Pending request not found.",
          });
      }

      // Delete the TransporterDemand document based on the requirementId from the acceptance
     if(acceptance.requirementId) await TransporterDemand.deleteOne({ _id: acceptance.requirementId });

      return res.status(200).json({
          success: true,
          message: "Request accepted successfully.",
          acceptance,
      });

  } catch (error) {
      console.error("Error accepting request:", error);
      return res.status(500).json({
          success: false,
          message: "Internal Server Error",
      });
  }
};

const mytransportPendingrequest = async (req, res) => {
  try {
    const myid = req.user?._id; 

    if (!myid || !mongoose.Types.ObjectId.isValid(myid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID.",
      });
    }

    const myrequest = await pendingRequest
      .find({ Farmerid: myid, completionFlag: false })
      .populate("Transporterid", "firstName lastName");

    if (!myrequest || myrequest.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No pending requests found.",
      });
    }

    return res.status(200).json({
      success: true,
      myrequest,
    });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching pending requests.",
      error: error.message,
    });
  }
};


  
module.exports = {requestTransport,tranportReqfarmer,reqFarmer,getNotifications,acceptRequest,myRequestFeed,acceptRequestTransporter,mytransportPendingrequest}
