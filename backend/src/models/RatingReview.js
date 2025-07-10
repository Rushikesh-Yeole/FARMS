const mongoose = require("mongoose")

const RatingReviewSchema = new mongoose.Schema({
  reviewer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  reviewee:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  role:{  //role of reviewee
    type:String,
    enum:['farmer', 'retailer', 'transporter'],
    required:true
  },
  rating:{
    type:Number,
    required:true,
    min:1,
    max:5
  },
  comment: {
    type: String,
    required: false,
    maxlength: 300
  },
},
{
  timestamps:true
}
)

module.exports = mongoose.model("RatingReviewSchema", RatingReviewSchema)