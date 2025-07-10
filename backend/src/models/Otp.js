const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    contactNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
         expires: 300, //5 minutes
    },
});

module.exports = mongoose.model("Otp", otpSchema);
