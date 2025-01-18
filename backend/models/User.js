const mongoose = require("mongoose")

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
        enum:["Farmer", "Retailer", "Transporter", "Admin"],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    profilePhoto:{
        type:String, //image url
        required: true
    },
    
},
{
    timestamps: true, //This automatically adds createdAt and updatedAt fields to your schema and updates the updatedAt field whenever the document is modified.
}
);

module.exports = mongoose.model("User", userSchema);
