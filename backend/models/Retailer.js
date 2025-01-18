const mongoose = require("mongoose")

const retailerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    crop:{
        type:String,
        required:true,
        trim:true
    },
    cropGrade:{
        type:Number,
        enum:[1,2,3,4],
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    pricePerKg:{
        type:Number,
        required:true
    },
    location: {
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
},
{
    timestamps: true, //This automatically adds createdAt and updatedAt fields to your schema and updates the updatedAt field whenever the document is modified.
}
)

module.exports = mongoose.model("Retailer", retailerSchema);