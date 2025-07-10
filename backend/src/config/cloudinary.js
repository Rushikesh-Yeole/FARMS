const cloudinary = require('cloudinary').v2
require("dotenv").config()

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });

        console.log("Connected to Cloudinary successfully!");
    } catch (error) {
        console.error("Error in connecting to Cloudinary:", error);
        throw new Error("Failed to connect to Cloudinary");
    }
};
