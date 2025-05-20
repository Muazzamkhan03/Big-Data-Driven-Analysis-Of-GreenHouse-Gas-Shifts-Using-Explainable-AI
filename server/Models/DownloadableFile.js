const mongoose = require('mongoose');

const DownloadableFileSchema = new mongoose.Schema({
    gas: {
        type: String
    },
    country: {
        type: String
    },
    url: {
        type: String
    },
    fileName: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const DownloadableFile = mongoose.model('downloadableFiles', DownloadableFileSchema);

module.exports = DownloadableFile;
