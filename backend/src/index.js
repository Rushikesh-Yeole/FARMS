// Example Structure
const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./config/database.js");
const { cloudinaryConnect } = require("./config/cloudinary.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9000;

// Routes and Middleware Imports
const userRoute = require("./routes/user.routes.js");
const farmRoute = require("./routes/farmer.routes.js");
const retailerRoute = require("./routes/retailer.routes.js");
const transportRoute = require("./routes/transporter.routes.js");
const consumerRoutes = require("./routes/consumer.routes.js");

const { authorize, isFarmer, isRetailer, isTransporter, isConsumer } = require("./middlewares/auth.js");

// Cron Jobs
require("./utils/lockShopkeeperDealsCron.js");
require("./utils/lockConsumerDealsCron.js");
require("./utils/SendRegionWiseDataCron.js");
require("./utils/SendRetailerDemandDataCron.js");

// Middleware Configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(cors({
  origin: 
      
  "https://farms-glmv.onrender.com"
  ,
  credentials: true
}));


// Routes Setup
app.use("/api", userRoute);
app.use('/farmer', authorize, isFarmer, farmRoute);
app.use('/retailer', authorize, isRetailer, retailerRoute);
app.use('/transporter', authorize, isTransporter, transportRoute);
app.use('/consumer', authorize, isConsumer, consumerRoutes);

// Base Route
app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is running successfully!'
  });
});
app.head('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is running successfully!'
  });
});


// Database Connection and Server Start
dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occurred in server starting process:", err);
  });
