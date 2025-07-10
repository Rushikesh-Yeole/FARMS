const express = require("express")

const {upload} = require("../middlewares/multer.middleware.js")
const router = express.Router();
const {signUpUser,verifyOtp,loginUser,logoutUser,isLogIn} = require("../controllers/user.controller.js")
const { otpRateLimiter } = require("../middlewares/rateLimiter");
const {validateInput} = require("../middlewares/validateInput.js")
const {postStock} = require("../controllers/FarmerOperations.controller.js")


// router.post("/signup", otpRateLimiter,validateInput,validatePassword,upload.single("profile") , signUpUser);
router.post("/signup",otpRateLimiter,validateInput,upload.single("profilePhoto"), signUpUser);
router.post("/verifyOtp",verifyOtp);
router.post("/login",validateInput, loginUser);
router.post("/logOut",logoutUser);
router.post("/auth/check",isLogIn);


module.exports = router;