const mongoose = require("mongoose")
const TransportDetails= require("../models/tranportDetails.model")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    contactNumber:{
        type:String,
        required:true,
        trim:true
    },
    accountType:{
        type:String,
        enum:["Farmer", "Retailer", "Transporter", "Admin", "Consumer"],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    transportDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TransportDetails"

    },
    
    profilePhoto:{
        type:String, //image url
        // required: true
    },
    //Below two fields will be used for the reset password functionality 
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
    averageRating:{
        type:Number,
        default:0
    },
    reviewCount:{
        type:Number,
        default:0
    },
    reliabilityScore:{
        type:Number,
        default:50  //50%
    },
    allocatedDeals:[
        {
            groupId:{
                type:mongoose.Schema.Types.ObjectId
            },
            totalQuantity:{
                type:Number
            },
            crop:{
                type:String
            },
            cropGrade:{
                type:String
            },
            numberOfShopkeepers:{
                type:Number
            },
            numberOfConsumers:{
                type:Number
            },
            deliveryDate:{
                type:String
            }
        }        
    ]
},
{
    timestamps: true, //This automatically adds createdAt and updatedAt fields to your schema and updates the updatedAt field whenever the document is modified.
}
);

module.exports = mongoose.model("User", userSchema);
