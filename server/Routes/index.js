const express = require("express");
const router = express.Router();
const verifyJWT = require('../Middlewares/verifyJWT');
const rateLimiter = require('../Middlewares/rateLimiter');
const verifyAuthentication = require("../Middlewares/verifyAuthentication");

router.use('/auth', require('./auth')); // For the authentication of users
router.use('/user', verifyJWT, verifyAuthentication, require('./users')); //For accessing, updating or deleting authorized user info
router.use('/emissions', require('./emissions')); // For getting the historical emissions data
router.use('/predictions', verifyJWT, rateLimiter, require('./prediction')); // For getting the predicting emissions
router.use('/extension', require('./extension')); // For getting the explanations of the predictions and recommendations
router.use('/resources', require('./resources') ); // For fetching the various resources, like, countries, gases, and sectors and sub-sectors
router.use('/download', require('./download') ); // For fetching the download url of downloading data
module.exports = router;