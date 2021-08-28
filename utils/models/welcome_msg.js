const mongoose = require('mongoose');

const welcome_msgSchema = new mongoose.Schema({
    guild_id: {
        type: String,
        default: ''
    },
    channel_id: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('welcome_msg', welcome_msgSchema);
