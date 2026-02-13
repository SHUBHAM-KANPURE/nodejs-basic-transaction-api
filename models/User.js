const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
        username: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', Schema);