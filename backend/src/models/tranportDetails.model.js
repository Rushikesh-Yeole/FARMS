const mongoose = require("mongoose");
const User = require("../models/User.js")

const transporterSchema = new mongoose.Schema(
  {
    TransporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique:true
    },
    vehicle: {
      vehicleType: {
        type: String,
        enum: ["Pickup", "Truck", "Eicher", "Tempo"],
        required: true,
      },
      capacity: {
        type: Number,
        required: true,
      },
      isColdStorageAvailable: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TransporterDetails", transporterSchema);
