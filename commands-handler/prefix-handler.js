const Discord = require('discord.js');
const DB = require('../database/mongoose-handler');

module.exports = {
    async registerPrefixes(client) {
        client.prefixes = new Discord.Collection();

        let prefixes = await DB.prefixes(client.guilds.cache.map(guild => guild.id));

        await prefixes.forEach(guild => {
            client.prefixes.set(guild.guild_id, guild.prefix);
        });
    }
}
