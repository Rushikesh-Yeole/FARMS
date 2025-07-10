const mongoose = require("mongoose");
const User = require('./User.js');
const TransporterDemand = require('./TransportRequirements.js');
const notificationSchema = new mongoose.Schema({
    _senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    _receiverId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }],
    message:{
        type:String,
        required:true
    },
    _farmerRequirementId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:TransporterDemand
    },
    _senderFarmerRequirementId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:TransporterDemand
    }
},{timestamps:true});

const Notification = mongoose.model('Notification',notificationSchema);
module.exports = Notification