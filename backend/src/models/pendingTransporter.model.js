const mongoose = require("mongoose");
const User = require("../models/User")
const transportrequirement = require("../models/TransportRequirements")

const pendingTransportSchema = new mongoose.Schema(
  {
    Transporterid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Farmerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requirementId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"transportrequirement"

    },
    crop: {
      type: String,
      trim: true,
    },
    quantities: { 
      type: Number,
      required: true,
    },
    Departlocation: {
      type: {
        type: String, // GeoJSON type must be "Point"
        enum: ["Point"],
        default: "Point",
      },
      place: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    Destination: {
      type: {
        type: String, // GeoJSON type must be "Point"
        enum: ["Point"],
        default: "Point",
      },
      place: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    DepatrureDate: {
      type: Date,
      required: true,
    },
    contactNumber: {
      type: String,
      // required: true,
    },
    completionFlag:{
      type:Boolean,
      required:true,
      default:false
    }
  },
  { timestamps: true }
);

//  Correct Model Definition
const pendingTransportModel = mongoose.model(
  "pendingTransportRequest",
  pendingTransportSchema
);

//  Correct Export
module.exports = pendingTransportModel;
