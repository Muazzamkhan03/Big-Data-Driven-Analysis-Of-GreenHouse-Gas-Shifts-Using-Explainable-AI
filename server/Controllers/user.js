const User = require('../Models/User');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        
        if (user && !user.isDeleted) {
            return res.status(200).json({ success: true, user: user });
        }
        else {
            return res.status(404).json({ success: false, error: "User not found" });
        }
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ success: false, error: "Internal server error occured" });
    }
}

const getHistory = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        
        if (user && !user.isDeleted) {
            return res.status(200).json({ success: true, history: user.history });
        }
        else {
            return res.status(404).json({ success: false, error: "User not found" });
        }
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ success: false, error: "Internal server error occured" });
    }
}

const deleteHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { historyId } = req.params;

        // Fetch the user
        const user = await User.findById(userId);
        if (!user || user.isDeleted) {
            return res.status(404).json({ success: false, error: 'User not found.' });
        }

        // Remove history item by ID
        user.history = user.history.filter(
            (item) => item._id.toString() !== historyId
        );

        await user.save();

        res.status(200).json({ success: true, history: user.history });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body; // Data to update
        console.log(req.body);

        // Validate input
        if (!name && !email) {
            return res.status(400).json({ success: false, error: 'No data provided to update.' });
        }

        // Fetch the user
        const user = await User.findById(userId);
        if (!user || user.isDeleted) {
            return res.status(404).json({ success: false, error: 'User not found.' });
        }

        // Update fields if provided
        if (name) user.fullName = name;
        if (email) user.email = email;

        // Save updated user
        await user.save();

        res.status(201).json({ success: true, user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch the user
        const user = await User.findById(userId);
        if (!user || user.isDeleted) {
            return res.status(404).json({ success: false, error: 'User not found.' });
        }

        //Soft delete the user
        user.isDeleted = true;

        // Save updated user
        await user.save();

        res.status(200).json({ success: true, user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword, matchPassword } = req.body;
    const userId = req.user.id;

    if (newPassword !== matchPassword) {
        res.status(400).json({ success: false, error: 'Passwords don\'t match.' });
    }

    try {
        // Fetch the user
        const user = await User.findById(userId);
        if (!user || user.isDeleted) {
            return res.status(404).json({ success: false, error: 'User not found.' });
        }

        const passMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passMatch) {
            return res.status(400).json({ success: false, error: "Incorrect old password." });
        }

        // Encrypts password
        const salt = await bcrypt.genSalt(10);
        const pwdHash = await bcrypt.hash(newPassword, salt);

        user.password = pwdHash;
        await user.save();

        // TODO: Send mail
        // const mergeData = mergeDataForPasswordUpdated(user);
        // sendEmail("./Templates/passwordUpdate.hbs", mergeData, user.email, "Password Updated");

        res.status(200).json({ success: true, message: 'Password updated successfully.' });
        
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, error: 'Internal server error occured' });
    }
}

module.exports = { getProfile, updateProfile, deleteProfile, updatePassword, getHistory, deleteHistory };