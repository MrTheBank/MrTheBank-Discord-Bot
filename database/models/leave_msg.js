const mongoose = require('mongoose');

const leave_msgSchema = new mongoose.Schema({
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

module.exports = mongoose.model('leave_msg', leave_msgSchema);
