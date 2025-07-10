const mongoose = require("mongoose")

const regionSchema = new mongoose.Schema({
    name: { type: String, required: true },  //Region name
    products: [{
        name: { type: String, required: true },  //Product name
        totalPost: { type: Number, required: true, default: 0 },
        totalDemand: { type: Number, required: true, default: 0 }
    }]
});

module.exports = mongoose.model("RegionData", regionSchema)