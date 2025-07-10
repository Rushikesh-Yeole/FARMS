const Notifications = require("../models/Notifications");
const UserNotifications = require("../models/UserNotifications");
const cron = require("node-cron");
const moment = require("moment");
const consumerDemands = require("../models/ConsumerRequirements");
const FarmerStock = require("../models/FarmerStock");
const client = require("../utils/twilioClient");
const User = require("../models/User");

const lockConsumerDeals = async () => {
    try {
        const today = new Date();
        const twoDaysLater = moment(today).add(25, "days").toDate();
        
        const demandsToLock = await consumerDemands.find({
            expectedDeliveryDate: { $lte: twoDaysLater },
            locked: false,
            pendingRequests: { $ne: [] }
        });
        
        const processedGroups = new Set();
        
        for (const demand of demandsToLock) {
            const groupId = demand.groupId.toString();
            if (processedGroups.has(groupId)) continue;
            processedGroups.add(groupId);

            const groupDemands = await consumerDemands.find({ groupId });
            const deliveryDate = demand.expectedDeliveryDate;
            const {crop, cropGrade} = demand;
            
            const numberOfConsumers = groupDemands.length;
            const totalQuantity = groupDemands.reduce((sum, d) => sum + d.quantity, 0);
            
            
            const sortedRequests = [...demand.pendingRequests].sort((a, b) => b.dealScore - a.dealScore);
            
            let bestFarmerStock = null;
            let bestDealScore = -Infinity;

            for (const request of sortedRequests) {
                const farmerStock = await FarmerStock.findById(request.farmerStockId).populate('userId', 'firstName lastName contactNumber');
                if (farmerStock && !farmerStock.sold) {
                    bestFarmerStock = farmerStock;
                    bestDealScore = request.dealScore;
                    
                    await FarmerStock.findByIdAndUpdate(request.farmerStockId, {
                        $inc: { quantity: -totalQuantity },
                        $set: { sold: true, consumers: groupDemands.map(demand => demand._id) }
                    });
                    break;
                }
            }

            if (!bestFarmerStock) {
                console.log(`No available unsold stock found for consumer group ${groupId}`);
                continue;
            }

            await consumerDemands.updateMany({ groupId }, {
                $set: {
                    bestFarmerStockId: bestFarmerStock._id,
                    bestFarmerStockScore: bestDealScore,
                    locked: true
                }
            });

            await User.findByIdAndUpdate(bestFarmerStock.userId, {
                $push: {
                    allocatedDeals: { groupId,crop,cropGrade, totalQuantity, numberOfConsumers, deliveryDate }
                }
            });

            const { firstName, lastName, contactNumber } = bestFarmerStock.userId;
            const messageBody = `Congratulations, ${firstName} ${lastName}! Your request to supply produce has been accepted. Please deliver by ${deliveryDate}. Check the "View Allocated Deals" tab in your profile for more info.`;
            
            const newNotif = await Notifications.create({
                body: messageBody
            });

            await UserNotifications.updateOne({ userId: bestFarmerStock.userId._id }, {
                $push: { notification: newNotif._id }
            },{
                upsert:true, new:true
            });

            try {
                await client.messages.create({
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: contactNumber,
                    body: messageBody
                });
            } catch (twilioError) {
                console.error(twilioError);
                console.log("Error in sending allocation SMS to the farmer.");
            }

            for (let consumer of groupDemands) {
                const consumerId = consumer.userId;
                const { crop, quantity, expectedDeliveryDate } = consumer;

                const consumerNotif = await Notifications.create({
                    body: `Hello. Your request for ${quantity} kg of ${crop} has been allocated to ${firstName} ${lastName}. The order will be delivered to you on or before ${expectedDeliveryDate}. Please check "My Orders" tab in your profile for more info.`
                });

                await UserNotifications.updateOne({ userId: consumerId }, {
                    $push: { notification: consumerNotif._id }
                },{
                    upsert:true, new:true
                });
            }

            console.log(`Notification sent to ${contactNumber} for consumer group ${groupId}: ${messageBody}`);
        }

        console.log("Locked", processedGroups.size, "consumer groups and notified farmers.");
    } catch (error) {
        console.error("Error in locking consumer deals:", error);
    }
};

// cron.schedule("0 0 * * *", lockConsumerDeals);

module.exports = cron;
