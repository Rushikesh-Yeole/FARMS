const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true
    },
    alternateNumber:{
        type:String,
        trim:true
    },
    age:{
        type:Number,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    bio:{  //this can be displayed on the profile page
        type:String,
        trim:true
    }
})

module.exports = mongoose.model("Profile", profileSchema);