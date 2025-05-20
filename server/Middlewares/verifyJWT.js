// This middleware fetches the jwt from the cookies, and ensures it is valid. If there is no jwt, then the user object is set to null
// and would be subjected to rate limiting

const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const verifyJWT = async (req, res, next) => {
    // Retrieving the auth-token from the cookies 
    const token = req.cookies['auth-token'];
    
    // If token doesnot exist, set user in the request to null, and move to the next middleware
    if(!token){
        req.user = null;
        return next();
        // return;
    }
    
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);

        if(!data.user){
            return res.status(401).json({ success: false, error: "Invalid authentication token" });
        }
        
        const user = await User.find({ _id: data.user.id });

        if (!user) {
            return res.status(401).json({ success: false, error: "Invalid authentication token" });
        }
       
        // Retrieve the id from the jw token and append the id to the request
        req.user = data.user;
        return next();
    }catch{
        return res.status(401).json({ success: false, error: "Invalid authentication token" });
    }
}

module.exports = verifyJWT;