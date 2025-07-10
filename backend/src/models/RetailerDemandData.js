const mongoose = require("mongoose")

const retailerDemandSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    product:{
        type:String,
        required:true,
        trim:true
    },
    time:{
        type:String
    },
    demand:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("RetailerDemandData", retailerDemandSchema)