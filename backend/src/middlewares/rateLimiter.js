const rateLimit = require("express-rate-limit");

// Rate limiter for OTP requests
const otpRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 3 OTP requests per windowMs
    message: {
        success: false,
        message: "Too many OTP requests from this IP, please try again after 15 minutes.",
    },
    
});

module.exports = { otpRateLimiter };



