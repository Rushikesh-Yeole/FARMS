const mongoose = require("mongoose");

const userNotificationSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    notification:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Notification"
        }
    ]
})

module.exports = mongoose.model("UserNotifications", userNotificationSchema);