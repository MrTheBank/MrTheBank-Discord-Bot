const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
    guild_id: {
        type: String,
        default: ''
    },
    prefix: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('prefix', prefixSchema, 'prefixes');
