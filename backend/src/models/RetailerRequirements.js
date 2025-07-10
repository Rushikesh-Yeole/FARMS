const mongoose = require("mongoose")

const retailerRequirementSchema = new mongoose.Schema({
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
        enum:[1,2,3,4,5],
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    pricePerQuintal:{
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
        address:{  //address as a string
            type: String,
            required:true
        },
        landmark:{
            type: String,
            required:true
        }
    },
    expectedDeliveryDate: {   //ISO format YYYY-MM-DD
        type: Date,
        required: true 
    },
    // accepted:{
    //     type:Boolean,
    //     default:false
    // },
    supplier:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"FarmerStock"
    },
    pendingRequests: [
        {
            farmerStockId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FarmerStock"
            },
            dealScore: {
                type: Number
            }
        }
    ],    
    contactNumber:{  //not mandatory -> This will be displayed in BEST DEALS so farmers can contact retailer
        type:String,
        trim:true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bestFarmerStockId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FarmerStock"
    },
    bestFarmerStockScore:{
        type:Number,
        default:-Infinity
    },
    locked:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true, //This automatically adds createdAt and updatedAt fields to your schema and updates the updatedAt field whenever the document is modified.
}
)

retailerRequirementSchema.index({crop:1, cropGrade:1});  //index crop and cropGrade in ascending order
retailerRequirementSchema.index({ location: '2dsphere' });
retailerRequirementSchema.index({ groupId: 1 });

module.exports = mongoose.model("Retailer", retailerRequirementSchema);