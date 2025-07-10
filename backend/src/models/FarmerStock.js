const mongoose = require("mongoose")

const farmerStockSchema = new mongoose.Schema({
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
    minExpectedPrice:{
        type:Number,
        required:true
    },
    image: {
        type: String,
        required: true,
    },
    location: {
      type: {
          type: String, // GeoJSON type must be "Point".  tells MongoDB that the coordinates field represents a point in space.
          enum: ['Point']
      },
      coordinates: {
          type: [Number], // Array to store [longitude, latitude]
          required: true,
          index: '2dsphere' // Enables spatial queries
      },
      address: {
          type: String, // Address provided by user as string
          required: true
      },
    },
    isFull:{
        type:Boolean,
        default:false
    },
    contactNumber:{  //not mandatory -> This will be displayed in PENDING REQUESTS and SUPPLIERS so retailer can contact farmer
        type:String,
        trim:true
    },
    pendingRetailerRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Retailer"  //retailer requirement
        }
    ],
    //confirmed
    shopbuyers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Retailer"  //retailer requirement
        }
    ],
    //confirmed
    directbuyers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ConsumerRequirements"  //retailer requirement
        }
    ],
    // confirmedRetailer:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Retailer"  //retailer requirement
    // },
    sold:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true, //This automatically adds createdAt and updatedAt fields to your schema and updates the updatedAt field whenever the document is modified.
}
)

module.exports = mongoose.model("FarmerStock", farmerStockSchema);