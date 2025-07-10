const mongoose = require("mongoose");
require("dotenv").config()

const dbConnection = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = { dbConnection };

