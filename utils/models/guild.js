const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const guildSchema = new mongoose.Schema({
    guild_id: {
        type: String,
        default: ''
    },
    guild_owner: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'active'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
guildSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('guild', guildSchema);
