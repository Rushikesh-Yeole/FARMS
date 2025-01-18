const mongoose = require("mongoose")

const farmerSchema = new mongoose.Schema({
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
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(http|https):\/\/[^ "]+$/.test(v); // Validate as a URL
            },
            message: props => `${props.value} is not a valid URL!`
        }
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

module.exports = mongoose.model("Farmer", farmerSchema);