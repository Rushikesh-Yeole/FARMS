const mongoose = require("mongoose");
const axios = require("axios");
const cron = require("node-cron");
const Retailer = require("../models/RetailerRequirements");
const RetailerDemandData = require("../models/RetailerDemandData");

const TARGET_URL = "https://farms-engine.onrender.com/addDemand"; // Replace with actual API URL

// Function to fetch, store, send, and clear data
const processRetailerDemands = async () => {
    try {
        console.log("Running cron job: Fetching retailer demands...");
        
        // Fetch all retailer crop demands
        const retailerDemands = await Retailer.find({}, "_id userId crop quantity updatedAt");

        // Store data in retailerDemandSchema with formatted time
        const demandData = retailerDemands.map(demand => ({
            id: String(demand.userId), // Ensure ID is a string
            product: String(demand.crop), // Ensure Product is a string
            time: new Date(demand.updatedAt).toISOString().split(".")[0], // Ensure proper date format
            demand: Number(demand.quantity) // Ensure Demand is a number
        }));        

        // Log the formatted data for verification
        console.log("Formatted Demand Data:", demandData);

        await RetailerDemandData.insertMany(demandData);
        console.log("Stored retailer demand data.");

        // Send data to external URL
        for (const data of demandData) {
            await axios.post(TARGET_URL, data);
            console.log("Sending:", data);
        }
        console.log("Successfully sent demand data.");

        // Clear retailerDemandSchema collection
        await RetailerDemandData.deleteMany({});
        console.log("Cleared retailer demand data collection.");
    } catch (error) {
        console.error("Error in processing retailer demands:", error);
    }
};

// Schedule the cron job to run every day at midnight (00:00)
// cron.schedule("0 2 * * *", processRetailerDemands);

// console.log("Cron job scheduled to run daily at midnight.");
