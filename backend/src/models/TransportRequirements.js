const mongoose = require("mongoose");
const User = require("../models/User.js")
const transportRequirementSchema = new mongoose.Schema(
  {
    FarmerIds: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedTransporters:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],

    Departlocations: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      place: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number], // Longitude, Latitude
        required: true,
      },
    },

    Destination: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      place: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    DepatrureDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    quantities: {
      type: Number,
      required: true,
    },

    contactNumber: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Create a geospatial index on Departlocations
transportRequirementSchema.index({ "Departlocations.coordinates": "2dsphere" });

module.exports = mongoose.model("TransporterRequirement", transportRequirementSchema);
