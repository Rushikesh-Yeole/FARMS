const express = require("express")
const {upload} = require("../middlewares/multer.middleware.js")
const router = express.Router();
// const {postStock} = require('../controllers/PostStock.controller.js')?
const {requestTransport,tranportReqfarmer,reqFarmer,getNotifications, acceptRequest,myRequestFeed,acceptRequestTransporter,mytransportPendingrequest} = require('../controllers/FarmerTransport.controller.js')
// const {postStock} = require('../controllers/PostStock.controller.js')
// const { upload }= require('../middlewares/multer.middleware.js')
const {postStock} = require('../controllers/FarmerOperations.controller.js')
const {viewBestDeals, viewBestDealsInRange, requestTheGroupOfShopkeepers} = require("../controllers/FarmerOperations.controller.js")

// const {authorize,isFarmer} = require('../middlewares/auth.js')
const {createReview, getReviews, updateRating, editComment, deleteReview} = require('../controllers/RatingReviewOperations.js')

const {viewFarmerNotifications,viewMyStock,viewAllocatedDeals,viewShopkeepersInAllocatedDeal,viewBestConsumerDeals,viewBestConsumerDealsInRange,requestTheGroupOfConsumers,viewConsumersInAllocatedDeal} = require("../controllers/FarmerOperations.controller.js")

const {deleteNotification} = require("../controllers/RetailerOperations.controller.js");

const {execCron} = require("../controllers/FarmerOperations.controller.js")

// router.post('/poststock',upload.single("cropImage"),postStock);
router.get('/farmFeed',myRequestFeed);
router.post('/accepttransportRequest',acceptRequestTransporter);
router.post('/reqtransporter',requestTransport);
router.get('/farmerRequest',tranportReqfarmer);
router.post('/acceptInvite',acceptRequest)
router.post('/sendrequest',reqFarmer);
router.get('/getNotify',getNotifications);
router.get('/getmypendingrequest',mytransportPendingrequest)


router.post('/poststock',upload.single("cropImage"),postStock); //done
router.get('/viewbestdeals', viewBestDeals);  //done
router.post('/viewbestdealsinrange', viewBestDealsInRange);  //done
router.get('/mystock', viewMyStock);  //done
router.post('/requestsupply', requestTheGroupOfShopkeepers);  //done  
router.get('/allocateddeals', viewAllocatedDeals) //done
router.get('/dealdetails', viewShopkeepersInAllocatedDeal)  //done

router.get('/consumerdeals/viewbestdeals', viewBestConsumerDeals);  //done
router.post('/consumerdeals/viewbestdealsinrange', viewBestConsumerDealsInRange);  //done
router.post('/consumerdeals/requestsupply', requestTheGroupOfConsumers);  //done
router.get('/consumerdeals/dealdetails', viewConsumersInAllocatedDeal);  //done


router.get('/notifications', viewFarmerNotifications);  
router.post('/deletenotification', deleteNotification);  

    
router.post('/createreview', createReview);
router.post('/updaterating', updateRating);
router.post('/editcomment',  editComment);
router.post('/deletereview', deleteReview); 
router.get('/getreviews', getReviews);


module.exports = router