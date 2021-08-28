const DB = require('../utils/database.js');

module.exports = async (client) => {
    await DB.db_connect().then(async () => {
        console.log('[MongoDB]: Connection Successful.');
        let prefixes = await DB.prefixes(client.guilds.cache.map(guild => guild.id));
        await prefixes.forEach(guild => {
            client.prefixes.set(guild.guild_id, guild.prefix);
        });
        console.log('[MongoDB]: Prefixes loaded.');
    });
    await client.user.setActivity(process.env.DISCORD_PREFIX+'help | mrthebank.maxnus.com', { type: 'PLAYING'});
    console.log("[Discord API]: Logged in as " + client.user.tag);
};
