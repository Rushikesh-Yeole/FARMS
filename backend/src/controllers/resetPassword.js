const User = require("../models/User");
const validatePassword = require("../middlewares/validatePassword"); 
const bcrypt = require("bcrypt");
const twilioClient = require("../utils/twilioClient"); 

exports.resetPasswordToken = async (req, res) => {
    try {
        const contactNumber = req.body.contactNumber;

        const user = await User.findOne({ contactNumber: contactNumber });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate(
            { contactNumber: contactNumber },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 mins in milliseconds
            },
            { new: true }
        );

        const message = `Your password reset token is: ${token}. It will expire in 5 minutes.`;
        await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER, 
            to: contactNumber,
        });

        return res.status(200).json({
            success: true,
            message: "Reset token sent successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in sending password reset token",
        });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and confirm password do not match",
            });
        }

        const passwordValidationErrors = validatePassword(password);
        if (passwordValidationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                errors: passwordValidationErrors,
            });
        }

        const userDetails = await User.findOne({ token: token });

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "Invalid token!",
            });
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token expired. Please generate a new token",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { token: token },
            {
                password: hashedPassword,
                token: null,
                resetPasswordExpires: null,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successful!",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password",
        });
    }
};
