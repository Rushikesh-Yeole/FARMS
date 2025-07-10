const {getStock} = require('../controllers/RetailerOperations.controller.js')
const express = require("express")
const router = express.Router();
exports.router = router;
// const {authorize,isRetailer} = require('../middlewares/auth.js')
const {postRequirement} = require("../controllers/RetailerOperations.controller.js")
const {createReview, getReviews, updateRating, editComment, deleteReview} = require('../controllers/RatingReviewOperations.js')

const {viewNotifications,viewMyOrders, viewSupplierOfOrder} = require("../controllers/RetailerOperations.controller.js")
const {deleteNotification} = require("../controllers/RetailerOperations.controller.js");



router.post('/postrequirement', postRequirement);  //done
router.get('/notifications', viewNotifications)  //done
router.get('/viewmyorders', viewMyOrders)    //done
router.get('/viewsupplier', viewSupplierOfOrder)  //done
router.post('/deletenotification', deleteNotification);  //done

// router.get('/getstock',getStock);
router.post('/createreview',  createReview);
router.post('/updaterating',  updateRating);
router.post('/editcomment',  editComment);
router.post('/deletereview', deleteReview);
router.get('/getreviews', getReviews);

module.exports = router