const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    stockID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FarmerStock",
        // required:true
    },
    requirementId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Retailer",
        // required:true
    }
   
})

module.exports = mongoose.model("Notifications", notificationSchema);