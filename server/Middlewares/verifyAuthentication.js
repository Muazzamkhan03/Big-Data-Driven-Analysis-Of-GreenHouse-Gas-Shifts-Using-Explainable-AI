// This middleware ensures that a user object exists in the request, to ensure, the user has been logged in

const verifyAuthentication = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({ success: false, error: "Unauthorized: User not logged in" }); 
    }

    return next();
}

module.exports = verifyAuthentication;