const mongoose = require("mongoose");
const cron = require("node-cron");
const axios = require("axios");
const Retailer = require("../models/RetailerRequirements");
const FarmerStock = require("../models/FarmerStock");
const RegionData = require("../models/RegionWiseData");

const DATA_POST_URL = "https://farms-engine.onrender.com/add"; 

async function updateSendAndClearData() {
    try {
        console.log("Running daily aggregation for region data...");

        // Extract demand data (Retailers)
        const retailerDemand = await Retailer.aggregate([
            {
                $project: {
                    region: { $toLower: { $arrayElemAt: [{ $split: ["$location.address", ","] }, 0] } }, // Extract region (lowercase)
                    product: "$crop",
                    demand: "$quantity"
                }
            },
            {
                $group: {
                    _id: { region: "$region", product: "$product" },
                    totalDemand: { $sum: "$demand" }
                }
            }
        ]);

        // Extract supply data (Farmers)
        const farmerSupply = await FarmerStock.aggregate([
            {
                $project: {
                    region: { $toLower: { $arrayElemAt: [{ $split: ["$location.address", ","] }, 0] } }, // Extract region (lowercase)
                    product: "$crop",
                    supply: "$quantity"
                }
            },
            {
                $group: {
                    _id: { region: "$region", product: "$product" },
                    totalSupply: { $sum: "$supply" }
                }
            }
        ]);

        // Extract unique regions from both demand and supply data
        const uniqueRegions = new Set([
            ...retailerDemand.map(r => r._id.region),
            ...farmerSupply.map(f => f._id.region)
        ]);

        // Convert supply results into a map for lookup
        const supplyMap = new Map();
        farmerSupply.forEach(({ _id, totalSupply }) => {
            const key = `${_id.region}-${_id.product}`;
            supplyMap.set(key, totalSupply);
        });

        // Convert demand results into a map for lookup
        const demandMap = new Map();
        retailerDemand.forEach(({ _id, totalDemand }) => {
            const key = `${_id.region}-${_id.product}`;
            demandMap.set(key, totalDemand);
        });

        // Prepare data to be sent
        const currentTime = new Date().toISOString(); // Full timestamp

        for (let region of uniqueRegions) {
            const allProducts = new Set([
                ...retailerDemand.filter(r => r._id.region === region).map(r => r._id.product),
                ...farmerSupply.filter(f => f._id.region === region).map(f => f._id.product)
            ]);

            for (let product of allProducts) {
                const key = `${region}-${product}`;
                const totalDemand = demandMap.get(key) || 0;
                const totalSupply = supplyMap.get(key) || 0;

                await RegionData.findOneAndUpdate(
                    { name: region, "products.name": product },
                    {
                        $inc: {
                            "products.$.totalDemand": totalDemand,
                            "products.$.totalSupply": totalSupply
                        }
                    },
                    { upsert: false, new: true, runValidators: true }
                ).then(async (updated) => {
                    if (!updated) {
                        await RegionData.findOneAndUpdate(
                            { name: region },
                            {
                                $push: {
                                    products: {
                                        name: product,
                                        totalDemand: totalDemand,
                                        totalSupply: totalSupply
                                    }
                                }
                            },
                            { upsert: true, new: true, runValidators: true }
                        );
                    }
                });

                const regionData = {
                    region: region,
                    product: product,
                    time: currentTime,
                    post: totalSupply,
                    demand: totalDemand
                };

                console.log("Sending data to server:", regionData);
                await axios.post(DATA_POST_URL, regionData);
            }
        }

        console.log("All data sent successfully!");

        // Clear the RegionData collection after successful data transmission
        await RegionData.deleteMany({});
        console.log("RegionData collection has been emptied.");
    } catch (error) {
        console.error("Error in updating/sending/clearing region data:", error);
    }
}

// Schedule the cron job to run daily at midnight
// cron.schedule("30 1 * * *", updateSendAndClearData, {
//     scheduled: true,
//     timezone: "Asia/Kolkata"
// });

