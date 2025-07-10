// const {getStock} = require('../controllers/retailer.controller.js')
const express = require("express")
const router = express.Router();
const {requstStatusfunction,getPendingreq,TransporterDetails,sendRequest,getAcceptedRequest} = require("../controllers/transporter.controller.js")
const {getReviews} = require('../controllers/RatingReviewOperations.js')
const {getRequest} = require('../controllers/transporter.controller.js')

router.get('/getinfo',getRequest);
router.get('/getpendingreq',getPendingreq);
router.get('/accepted',getAcceptedRequest);
// router.get('/getreviews', getReviews);
router.get('/confirmRequest',requstStatusfunction);
router.post('/postDetails',TransporterDetails);
router.post('/sendrequest',sendRequest);

module.exports = router 

