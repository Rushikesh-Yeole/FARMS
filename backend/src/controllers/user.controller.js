const User = require("../models/User.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Otp = require("../models/Otp.js")
const validator = require("validator")
const {validatePassword} = require("../middlewares/validatePassword.js")
require("dotenv").config()

const client = require("../utils/twilioClient");
const {  uploadOnCloudinary } = require("../utils/uploadToCloudinary.js");


const signUpUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            contactNumber,
            accountType,
            password
        } = req.body;
        const profile = req.file?.path;
        if(profile){
            const photo = await uploadOnCloudinary(profile);
        }
        

        // console.log(firstName, lastName, accountType, password, contactNumber);

        if (!firstName || !lastName || !contactNumber || !password ||!accountType) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // contact number validation
        if (!validator.isMobilePhone(contactNumber, 'any')) {
            return res.status(400).json({ error: "Invalid contact number" });
        }
        const passcode_valid = validatePassword(password);
        if (passcode_valid.length > 0) { // Check if there are any validation errors
            console.log("Invalid input");
            return res.status(400).json({
            err: passcode_valid
        });
}

        // if (password !== confirmPassword) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Password and Confirm password do not match",
        //     });
        // } 

        const existedUser = await User.findOne({ contactNumber });
        if (existedUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP

        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        await Otp.create({ contactNumber, otp: hashedOtp });


        console.log(`Generated OTP for ${contactNumber}: ${otp}`);

        
        

        await client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: contactNumber,
            body: `Your OTP is ${otp}`,
        });

        

        return res.status(200).json({
            message: "OTP sent successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error during signup" });
    }
};



const verifyOtp = async (req, res) => {
    try {
        const { otp, contactNumber,firstName ,lastName,accountType,password,profilePhoto} = req.body;

        if (!validator.isMobilePhone(contactNumber, "any", { strictMode: true })) {
            return res.status(400).json({ error: "Invalid contact number format" });
        }

        const storedOtp = await Otp.findOne({ contactNumber })
                                   .sort({ createdAt: -1 })  // Sort in descending order of creation time
                                   .limit(1);  // To ensure we get only the most recent one
        if (!storedOtp || !(await bcrypt.compare(otp.toString(), storedOtp.otp))) {
            return res.status(401).json({ error: "Invalid or expired OTP" });
        }        

        await Otp.deleteOne({ _id: storedOtp._id });

        const e_password = await bcrypt.hash(password,10);
        const user2 = await User.create({
            firstName,
            lastName,
            contactNumber,
            accountType,
            password: e_password,
            profilePhoto: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });
        


        return res.status(200).json({
            success: true,
            message: "Signed up successfully",
            user2,
        });
    } catch (err) {
        console.error("Error in verifyOtp:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const loginUser = async(req,res)=>{
    try{

        const {contactNumber,password} = req.body;

        if(!contactNumber || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all fields"
            })
        }

        if (!validator.isMobilePhone(contactNumber, 'any')) {
            return res.status(400).json({ error: "Invalid contact number" });
        }

        const user = await User.findOne({contactNumber:contactNumber});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not registered. Please signup first"
            })
        }
        const flag = await bcrypt.compare(password,user.password); 
        if(!flag){
            return res.status(401).json({
                success:false,
                message:"Incorrect password"
            })
        }
        const token = await jwt.sign({
            _id:user._id,
            contactNumber:user.contactNumber,
            accountType:user.accountType
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn:process.env.TOKEN_EXPIRY
            }
            );
        if(!token){
            res.status(500).json({err:"Error in token generation"});
        }

        // Send the token in an HTTP-only cookie instead of storing in db
        

        res.cookie("token", token,{
            httpOnly:true,
            secure: true,
            sameSite: "None"
        }).status(200).json({
            success: true,
            token,
            accountType:user.accountType,
            message: "Logged in successfully",
        });
        
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in logging in"
        })
    }
}

const logoutUser = (req, res) => {
    return res
      .clearCookie("token", {
        httpOnly: true,
        secure: true, // Match the login cookie settings
        sameSite: "None",
        partitioned: true
      })
      .status(200)
      .json({ message: "Logged out successfully" });
};



const changePassword = async (req, res) => {
    try {
        
        const { id } = req.user; // Populated by the authenticateToken middleware

        const user = await User.findById(id);  

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect old password.",
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm new password do not match.",
            });
        }

        const passwordValidationErrors = validatePassword(newPassword);
        if (passwordValidationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                errors: passwordValidationErrors,
            });
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = newHashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully.",
        });
    } catch (error) {
        console.error("Error in changing password:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while changing the password.",
        });
    }
};


const isLogIn = (req,res)=>{
    if (req.cookies.token) {
        return res.json({ isLoggedIn: true });
      }
      return res.json({ isLoggedIn: false });

}
module.exports = { signUpUser, verifyOtp, loginUser,logoutUser, changePassword,isLogIn};