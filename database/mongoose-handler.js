const mongoose = require('mongoose');

module.exports = {
    initDatabase() {
        mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).catch(err => {
            console.log('[MongoDB]: Connection Failed.')
            console.log('[MongoDB]: '+err)
            process.exit(0);
        });
    },

    closeDatabase() {
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('[MongoDB]: Connection Closed.');
                process.exit(0);
            });
        });
    },

    // async db_connect() {
    //     return mongoose.connection.once('open', () => {return true});
    // },

    // Prefixes Handler
    async prefixes(guild_ids) {
        const prefixSchema = require('./models/prefix');
        return await prefixSchema.find({guild_id: {$in: guild_ids}}, 'guild_id prefix').exec();
    },

    async set_prefix(guild_id, prefix) {
        const prefixSchema = require('./models/prefix');

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
    },

    async default_prefix(guild_id) {
        const prefixSchema = require('./models/prefix');

        return prefixSchema.deleteOne({guild_id: guild_id});
    },

    async guildCreate(guild) {
        const guildSchema = require('./models/guild');

        return guildSchema.findOne({ guild_id: guild.id }, async function (err, result) {
            if (err) {
                return false;
            }

            if (result) {
                await guildSchema.updateOne({ guild_id: guild.id }, { status: 'active' });
            } else {
                await guildSchema.create({
                    guild_id: guild.id,
                    guild_owner: guild.ownerId
                });
            }
            return true;
        });
    },

    async guildDelete(guild) {
        const guildSchema = require('./models/guild');

        await guildSchema.updateOne({ guild_id: guild.id }, { status: 'inactive' });
        return true;
    },

    async guildMemberMSG_create(model, guild_id, channel_id, message) {
        const msgSchema = require('./models/'+model);

        await msgSchema.create({
            guild_id: guild_id,
            channel_id: channel_id,
            message: message
        });
        return true;
    },

    async guildMemberMSG_get(model, guild_id) {
        const msgSchema = require('./models/'+model);

        return await msgSchema.findOne({ guild_id: guild_id }).exec();
    },

    async guildMemberMSG_remove(model, guild_id) {
        const msgSchema = require('./models/'+model);

        return msgSchema.deleteOne({ guild_id: guild_id });
    },

    async guildMemberMSG_edit(model, guild_id, field, context) {
        const msgSchema = require('./models/'+model);

        return msgSchema.updateOne({ guild_id: guild_id }, { [field]: context });
    }
}
