const mongoose = require("mongoose");
const cron = require("node-cron");
const User = require("../models/User"); // Adjust the path as needed

const removeExpiredDeals = async () => {
    try {
        const currentDate = new Date();
        
        await User.updateMany(
            {},
            { $pull: { allocatedDeals: { deliveryDate: { $lt: currentDate.toISOString().split("T")[0] } } } }
        );

        console.log("Expired allocated deals removed successfully.");
    } catch (error) {
        console.error("Error removing expired allocated deals:", error);
    }
};

// // Schedule the cron job to run every day at midnight
// cron.schedule("0 1 * * *", () => {
//     console.log("Running cron job to remove expired allocated deals...");
//     removeExpiredDeals();
// });
