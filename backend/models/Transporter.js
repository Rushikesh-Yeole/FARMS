const mongoose = require("mongoose")

const transporterSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    departLocation:{
        type: {
            type: String, // GeoJSON type must be "Point"
            enum: ['Point'],
            required: true,
          },
          coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
          },
    },
    deliveryLocation:{
        type: {
            type: String, // GeoJSON type must be "Point"
            enum: ['Point'],
            required: true,
          },
          coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
          },
    },
    dateOfJourney:{
        type:Date,
        required:true,
        default:Date.now()
    },
    capacity:{
        type:Number,
        required:true
    }
},
{
    timestamps: true, //This automatically adds createdAt and updatedAt fields to your schema and updates the updatedAt field whenever the document is modified.
}
)

module.exports = mongoose.model("Transporter", transporterSchema);