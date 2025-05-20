//This middleware ensures ratelimiting for unauthorized users

const rateLimit = require('express-rate-limit');

// Rate limiting for unauthenticated users
const unauthenticatedLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24-hour window
    max: 3, // Max 3 requests per IP per day
    handler: (req, res, next) => {
       return res.status(429).json({ success: false, error: "You have exceeded the maximum number of requests for today. Please try again tomorrow." });
    },
    standardHeaders: true, // Send rate limit info in headers
    legacyHeaders: false, // Disable deprecated headers
});

const rateLimiter = (req, res, next) => {
    console.log("Checking if user object exists in request");
    if (req.user) {
        console.log("User object exists, going forward without checking rate limiting");
        // If authenticated, skip rate limiting
        return next();
    }

    console.log('Real IP:', req.ip);
    console.log("Checking rate limiting");

    // Apply rate limiting to unauthenticated users
    unauthenticatedLimiter(req, res, next);
}

module.exports = rateLimiter;