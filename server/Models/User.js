const mongoose = require('mongoose');
const crypto = require('crypto');

// Subschema for search history
const searchHistorySchema = new mongoose.Schema({
    country: { type: String, required: true },
    gas: { type: String, required: true },
    sector: { type: String, required: true },
    year: { type: Number, required: true },
    lat: { type: Number }, // optional
    long: { type: Number },  // optional – confirm if this should be 'lng'
    timestamp: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String
    },
    resetTokenExpiry: {
        type: Date
    },
    history: {
        type: [searchHistorySchema],
        default: []
    }
});

UserSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = resetToken;
    this.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
    return resetToken;
}

UserSchema.methods.resetPassword = function (password) {
    this.password = password;
    this.resetToken = undefined;
    this.resetTokenExpiry = undefined;
}

const User = mongoose.model('users', UserSchema);

module.exports = User;
