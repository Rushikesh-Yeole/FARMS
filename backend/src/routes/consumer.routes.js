const express = require("express");
const router = express.Router();
const {postRequirement} = require("../controllers/ConsumerOperations.controller.js")

const {viewNotifications,viewMyOrders, viewSupplierOfOrder} = require("../controllers/ConsumerOperations.controller.js")
const {deleteNotification} = require("../controllers/RetailerOperations.controller.js");


router.post('/postrequirement', postRequirement);   //done
router.get('/notifications', viewNotifications)  //done
router.get('/viewmyorders', viewMyOrders)    //done
router.get('/viewsupplier', viewSupplierOfOrder) //done 
router.post('/deletenotification', deleteNotification);  //done

module.exports = router