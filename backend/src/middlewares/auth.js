const jwt = require("jsonwebtoken");


//For token verification
exports.authorize = (req, res, next) => {
    try{
       
        const token = req.cookies.token 
       
        if(!token || token === undefined){
            // console.log("err4")
            return res.status(401).json({
                success:false,
                message:"Token missing"
            });
        }

        try{
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            // console.log(decoded);
            req.user = decoded; 
            next();
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid !"
            })
        }

        
    }catch(err){
        console.log(err)
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the token"
        });
    }
}



exports.isFarmer = (req, res, next) => {
    try{
        if(req.user.accountType !== "Farmer"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for FARMERS ONLY !"
            });
        }
        next();
    } catch(err){
        return res.status(500).json({
            success:false,
            message:"Some internal server error"
        });
    }
}


exports.isRetailer = (req, res, next) => {
    try{
        if(req.user.accountType !== "Retailer"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Retailer ONLY !"
            });
        }
        next();
    } catch(err){
        return res.status(500).json({
            success:false,
            message:"Some internal server error"
        });
    }
} 


exports.isTransporter = (req, res, next) => {
    try{
        if(req.user.accountType !== "Transporter"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Transporter  ONLY !"
            });
        }
        next();
    } catch(err){
        return res.status(500).json({
            success:false,
            message:"Some internal server error"
        });
    }
} 


exports.isConsumer = (req, res, next) => {
    try{
        if(req.user.accountType !== "Consumer"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for CONSUMER  ONLY !"
            });
        }
        next();
    } catch(err){
        return res.status(500).json({
            success:false,
            message:"Some internal server error"
        });
    }
} 
