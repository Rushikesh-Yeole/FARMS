const mongoose = require("mongoose");
const User = require("../models/User.js");

const requestStatusSchema = new mongoose.Schema({
    Transporterid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    Farmerid:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    }],
    crop: {
        type: String,
        // required: true,
        trim: true,
    },
    quantity: [{
        type: Number,
        required: true,
    }],
    
    Departlocation: [{
        type: {
            type: String, // GeoJSON type must be "Point"
            enum: ["Point"],
            default:"Point" // Optional: You might want to make it required
        },
        place:{
            type:String,
            required:true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    }],
    Destination: {
        type: {
            type: String, // GeoJSON type must be "Point"
            enum: ["Point"],

            default:"Point"
        },
        place:{
            type:String,
            required:true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    DepatrureDate: {
        type: Date,
        required: true, // Ensure departure date is required
    },
}, { timestamps: true });



transportRequest = mongoose.model("RequestStatus", requestStatusSchema);
module.exports = transportRequest