const Review = require('../models/RatingReview')
const User = require('../models/User')
const mongoose = require('mongoose')

exports.createReview = async(req, res) => {
    try{
        const {revieweeId, role, comment} = req.body;  //role means role of reviewee (farmer or retailer or transporter)
        const rating = parseFloat(req.body.rating);
        const reviewerId = req.user._id;

        if (!revieweeId || !role || !rating) {
            return res.status(400).json({
              success: false,
              message: "Missing required fields: revieweeId, role, or rating.",
            });
        }

        if (!['farmer', 'retailer', 'transporter'].includes(role.toLowerCase())) {
          return res.status(400).json({
            success: false,
            message: "Reviewee role must be either 'farmer', 'retailer', or 'transporter'.",
          });
        }
        
        // Mongoose will handle the validation at the database level. But for better UX 
        if (comment && comment.length > 300) {
            return res.status(400).json({ message: 'Comment cannot exceed 300 characters.' });
        }

        const existingReview = await Review.findOne({reviewee:revieweeId, reviewer:reviewerId});
        if(existingReview){
            return res.status(400).json({
                success:false,
                message:"You've already reviewed this user."
            })
        }


        //create review
        const newReview = await Review.create({
            reviewee: revieweeId,
            reviewer: reviewerId,
            role: role.toLowerCase(),
            rating,
            comment,
        });

          console.log(newReview);

        //update reviewee model
        const reviewee = await User.findById(revieweeId);
        const newReviewCount = reviewee.reviewCount + 1;
        const newAvgRating = ((reviewee.averageRating * reviewee.reviewCount) + rating) / newReviewCount;

        reviewee.averageRating = newAvgRating;
        reviewee.reviewCount = newReviewCount;
        await reviewee.save();

        return res.status(200).json({
            success:true,
            message:"Rating and Review posted successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in posting rating and review"
        })
    }
}

//fetch reviews for a farmer/retailer
exports.getReviews = async (req, res) => {
  try {
    const { revieweeId } = req.query;  // Use req.query to get URL parameters

    const reviews = await Review.find({ reviewee: revieweeId }).populate('reviewer', 'firstName lastName');
    res.status(200).json({ message: "All reviews fetched", reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error in fetching reviews', error });
  }
};


exports.updateRating = async (req, res) => {
    try {
      const { revieweeId, newrating } = req.body;
  
      const reviewerId = req.user._id;
  
      if (!revieweeId || !newrating) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: revieweeId, newrating",
        });
      }
  
      const existingReview = await Review.findOne({
        reviewee: revieweeId,
        reviewer: reviewerId,
      });
  
      if (!existingReview) {
        return res.status(404).json({
          success: false,
          message: "Review not found.",
        });
      }
  
      const reviewee = await User.findById(revieweeId);

      if(!reviewee){
        return res.status(404).json({
          success: false,
          message: "Reviewee not found for updating rating",
        });
      }

      const currentRating = existingReview.rating;
      const newAvgRating =
        (reviewee.averageRating * reviewee.reviewCount - currentRating + newrating) /
        reviewee.reviewCount;
  
      existingReview.rating = newrating;
      await existingReview.save();
  
      reviewee.averageRating = newAvgRating;
      await reviewee.save();
  
      return res.status(200).json({
        success: true,
        message: "Rating updated successfully",
        review: existingReview,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error in updating rating of the user.",
      });
    }
  };
  


exports.editComment = async(req, res) => {
    try{
        //fetch revieweeid, rating comment
        const {revieweeId, newcomment} = req.body;

        //fetch reviewer id
        const reviewerId = req.user._id;

        //validations
        if (!revieweeId || !newcomment) {
            return res.status(400).json({
            success: false,
            message: "Missing required fields: revieweeId, newcomment",
            });
        }

        if (newcomment && newcomment.length > 300) {
            return res.status(400).json({ message: 'Comment cannot exceed 300 characters.' });
        }

        //find the review
        const updatedReview = await Review.findOneAndUpdate({
            reviewee:revieweeId,
            reviewer:reviewerId,
            },
            {
                comment:newcomment,
            },
            {
                new:true
            }
        )

        if (!updatedReview) {
            return res.status(404).json({
              success: false,
              message: "Review not found.",
            });
          }

        return res.status(200).json({
            success:true,
            message:"Comment updated successfully",
            review:updatedReview
        })

    } catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in updating comment.",
        })
    }
}


//delete both rating and comment
exports.deleteReview = async(req, res) => {

    try{
        const {revieweeId} = req.body;
        const reviewerId = req.user._id;

        const review = await Review.findOne({
            reviewee:revieweeId,
            reviewer:reviewerId
        });

        if (!review) {
            return res.status(404).json({
              success: false,
              message: "Review not found.",
            });
          }

        //update avg rating after deletion
        const reviewee = await User.findById(revieweeId);

        if(!reviewee){
          return res.status(404).json({
            success: false,
            message: "Reviewee not found for updating rating",
          });
        }

        const newReviewCount = reviewee.reviewCount - 1;

        const newAvgRating =
        newReviewCount > 0
            ? (reviewee.averageRating * reviewee.reviewCount - review.rating) /
            newReviewCount
            : 0;       

        reviewee.averageRating = newAvgRating;
        reviewee.reviewCount = newReviewCount;
        await reviewee.save();

        await review.deleteOne();

        return res.status(200).json({
            success:true,
            message:"Review deleted successfully",
        })

    } catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in deleting review."
        })
    }
}


