const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const axios = require('axios');
const crypto = require('crypto');
// const sendEmail = require('../utils/mailer');
// const { mergeDataForForgotPassword, mergeDataForPasswordUpdated } = require('../utils/mailMergeDataCreators/password');

const register = async (req, res) => {
    try {
        // Checks for existing emails  
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: false, error: "Email already in use" });
        }
        
        // Verify the captcha token
        try {
            const response = await axios.post(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${req.body.captchaToken}`
            )
            if (!response.data.success) {
                return res.status(500).json({ success: false, error: "Captcha failed, retry!" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: "Failed to verify captcha" });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const pwdHash = await bcrypt.hash(req.body.password, salt);

        // Creates a new user
        user = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: pwdHash
        });

        // Creating response payload
        const data = {
            user: {
                id: user.id,
                email: user.email
            }
        };

        // Signing the data with an auth token and returning 
        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        res.cookie("auth-token", authToken, { secure: true, httpOnlly: true, sameSite: "None", maxAge: 60 * 60 * 1000 });

        return res.status(201).json({ success: true, data: { name: user.fullName, email: user.email, userId: user._id } });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, error: "Internal server error occured" });
    }
}

const login = async (req, res) => {

    const { email, password, remember } = req.body;

    try {
        // Checking existence of user
        let user = await User.findOne({ email }); // Writing object like this is equivalent to writing {email: email}
        if (!user) {
            return res.status(400).json({ success: false, error: "Incorrect credentials" });
        }

        // Matching password with the stored password hash 
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(400).json({ success: false, error: "Incorrect credentials" });
        }

        // Signing the data to be returned and then sending the token to the client
        const data = {
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone
            }
        };

        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        //If user chose the "Remember me" option, then the token's age is 5 days, else it is an hour
        if (remember) {
            res.cookie("auth-token", authToken, { secure: true, httpOnlly: true, sameSite: "None", maxAge: 5 * 24 * 60 * 60 * 1000 });
        }
        else {
            res.cookie("auth-token", authToken, { secure: true, httpOnlly: true, sameSite: "None", maxAge: 60 * 60 * 1000 });
        }

        return res.status(201).json({ success: true, data: { name: user.firstName, email: user.email, userId: user._id } });

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, error: "Internal server error occured" });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Checking existence of user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "User not found" });
        }

        // Generating a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        //TODO: Send mail
        console.log(resetToken);
        
        res.status(200).json({ success: true, message: 'Password reset email sent successfully.' });

    } catch (error) {
        console.error('Error sending password reset email:', error.message);
        res.status(500).json({ success: false, error: 'Failed to send reset email.' });
    }
}

const resetPassword = async (req, res) => {
    const { password } = req.body;
    const token = req.params.token;

    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid or expired token." });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const pwdHash = await bcrypt.hash(password, salt);

        user.password = pwdHash;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        // TODO: Send mail
        // const mergeData = mergeDataForPasswordUpdated(user);
        // sendEmail("./Templates/passwordUpdate.hbs", mergeData, user.email, "Password Updated");

        res.status(200).json({ success: true, message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ success: false, error: 'Failed to reset password.' });
    }
}

module.exports = { register, login, forgotPassword, resetPassword };
