const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).catch(err => {
    console.log('[MongoDB]: Connection Failed.')
    console.log('[MongoDB]: '+err)
    process.exit(0);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('[MongoDB]: Connection Closed.');
        process.exit(0);
    });
});

class Database {
    static async db_connect() {
        return mongoose.connection.once('open', function () {
            return true;
        });
    }

    // New guild or removed guild.
    static guildCreate(guild) {
        const guildSchema = require('../utils/models/guild');

        return guildSchema.findOne({ guild_id: guild.id }, async function (err, result) {
            if (err) {
                return false;
            }

            if (result) {
                await guildSchema.updateOne({ guild_id: guild.id }, { status: 'active' });
            } else {
                await guildSchema.create({
                    guild_id: guild.id,
                    guild_owner: guild.ownerID
                });
            }
            return true;
        });
    }

    static async guildDelete(guild) {
        const guildSchema = require('../utils/models/guild');

        await guildSchema.updateOne({ guild_id: guild.id }, { status: 'inactive' });
        return true;
    }

    // Prefixes collection.
    static async prefixes(guild_ids) {
        const prefixSchema = require('../utils/models/prefix');
        return await prefixSchema.find({guild_id: {$in: guild_ids}}, 'guild_id prefix').exec();
    }

    static async set_prefix(guild_id, prefix) {
        const prefixSchema = require('../utils/models/prefix');

        return prefixSchema.findOne({ guild_id: guild_id }, async function (err, result) {
            if (err) {
                return false;
            }

            if (result) {
                await prefixSchema.updateOne({ guild_id: guild_id }, { prefix: prefix })
            } else {
                await prefixSchema.create({
                    guild_id: guild_id,
                    prefix: prefix
                });
            }
            return true;
        });
    }

    static async default_prefix(guild_id) {
        const prefixSchema = require('../utils/models/prefix');

        await prefixSchema.deleteOne({ guild_id: guild_id });
        return true;
    }

    // Welcome message & leave message collections.
    static async guildMemberMSG_create(model, guild_id, channel_id, message) {
        const msgSchema = require('../utils/models/'+model);

        await msgSchema.create({
            guild_id: guild_id,
            channel_id: channel_id,
            message: message
        });
        return true;
    }

    static async guildMemberMSG_get(model, guild_id) {
        const msgSchema = require('../utils/models/'+model);

        return await msgSchema.findOne({ guild_id: guild_id }).exec();
    }

    static async guildMemberMSG_remove(model, guild_id) {
        const msgSchema = require('../utils/models/'+model);

        await msgSchema.deleteOne({ guild_id: guild_id });
        return true;
    }

    static async guildMemberMSG_edit(model, guild_id, field, context) {
        const msgSchema = require('../utils/models/'+model);

        await msgSchema.updateOne({ guild_id: guild_id }, { [field]: context });
        return true;
    }
}

module.exports = Database;
