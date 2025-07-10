const Notifications = require("../models/Notifications");
const UserNotifications = require("../models/UserNotifications");

const cron = require("node-cron");
const moment = require("moment");
const retailerDemands = require("../models/RetailerRequirements");
const FarmerStock = require("../models/FarmerStock");
const client = require("./twilioClient");
const User = require("../models/User")

// Function to execute the locking logic
const lockDeals = async () => {
    try {
        const today = new Date();
        const twoDaysLater = moment(today).add(25, "days").toDate();  //25 days for testing
        
        const demandsToLock = await retailerDemands.find({
            expectedDeliveryDate: { $lte: twoDaysLater },
            locked: false,
            pendingRequests: { $ne: [] } 
        });
        
        const processedGroups = new Set(); 
        
        for (const demand of demandsToLock) {
            const groupId = demand.groupId.toString();
            

            if (processedGroups.has(groupId)) continue;

            processedGroups.add(groupId); 

            const groupDemands = await retailerDemands.find({ groupId });

            const deliveryDate = demand.expectedDeliveryDate;
            const numberOfShopkeepers = groupDemands.length;
            const totalQuantity = groupDemands.reduce((sum, d) => sum + d.quantity, 0);
            const avgPrice= groupDemands.length? groupDemands.reduce((sum, d) => sum + d.pricePerQuintal, 0) / groupDemands.length: 0;

           
           

            //create copy by spreading (...) instead of modifying original array
            const sortedRequests = [...demand.pendingRequests].sort((a, b) => b.dealScore - a.dealScore);

            let bestFarmerStock = null;
            let bestDealScore = -Infinity;

                    // console.log(bestFarmerStock);
                    // console.log(bestDealScore);

            for (const request of sortedRequests) {
                const farmerStock = await FarmerStock.findById(request.farmerStockId).populate('userId', 'firstName lastName contactNumber');
                if (farmerStock && !farmerStock.sold) { 
                    bestFarmerStock = farmerStock;
                    bestDealScore = request.dealScore;

                    

                    await FarmerStock.findByIdAndUpdate(
                        request.farmerStockId,
                        {
                            $inc:{
                                quantity:-totalQuantity
                            },
                            $set:{
                                sold:true,
                                shopbuyers:groupDemands.map(demand => demand._id)
                            }
                        },
                    )
                    break;
                }
            }

            

            if (!bestFarmerStock) {
                console.log(`No available unsold stock found for group ${groupId}`);
                continue;
            }

            await retailerDemands.updateMany(
                { groupId },
                {
                    $set: {
                        bestFarmerStockId: bestFarmerStock._id,
                        bestFarmerStockScore: bestDealScore,
                        locked: true
                    }
                }
            );

            await User.findByIdAndUpdate(bestFarmerStock.userId, {
                $push: { 
                    allocatedDeals: {
                        groupId,
                        totalQuantity,
                        avgPrice,
                        numberOfShopkeepers,
                        deliveryDate
                    } 
                }
            });

            const { firstName, lastName, contactNumber } = bestFarmerStock.userId;
            const messageBody = `Congratulations, ${firstName} ${lastName}! Your request to supply produce has been accepted. Please deliver by ${demand.expectedDeliveryDate}. Check the "View Allocated Deals" tab in your profile for more info.`;

            const newNotifBody = `Congratulations, ${firstName} ${lastName}! Your request to supply produce has been accepted. Please deliver by ${demand.expectedDeliveryDate}.Check the "View Allocated Deals" tab in your profile for more info.`; 

            const newNotif = await Notifications.create({
                body:newNotifBody
            })

            await UserNotifications.updateOne({userId: bestFarmerStock.userId._id}, {
                $push:{
                    notification: newNotif._id
                }
            },{
                upsert:true, new:true
            })

            try{
                await client.messages.create({
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: contactNumber,
                    body: messageBody
                });
            } catch(twilioError){
                console.error(twilioError);
                console.log("Error in sending allocation sms to the farmer.")
            }

            //send in-app notif to each shopkeeper
            for(let shopkeeper of groupDemands){
                const shopkeeperId = shopkeeper.userId;
                const {crop, quantity, expectedDeliveryDate} = shopkeeper;

                const shopNotif = await Notifications.create({
                    body:`Hello. Your request for ${quantity} of ${crop} has been allocated to ${firstName} ${lastName}. The order will be delivered to you on or before ${expectedDeliveryDate}.Please check "My Orders" tab in your profile for more info.`
                })

                await UserNotifications.updateOne({userId: shopkeeperId},
                    {
                        $push:{
                            notification:shopNotif._id
                        }
                    },{
                        upsert:true, new:true
                    }
                )
            }

            console.log(`Notification sent to ${contactNumber} for group ${groupId}: ${messageBody}`);
        }

        console.log("Locked", processedGroups.size, "groups and notified farmers.");

    } catch (error) {
        console.error("Error in locking deals:", error);
    }
};


// Schedule the cron job to run at midnight
// cron.schedule("0 0 * * *", lockDeals);  


// module.exports is kept the same
module.exports = cron;
