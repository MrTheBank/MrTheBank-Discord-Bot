const DB = require('../utils/database.js');

module.exports = async (client) => {
    await DB.db_connect().then(() => {
        console.log('[MySQL]: Connection Successful.');
    });
    await DB.prefixes().then((r) => {
        r.forEach(row => {
            client.prefixes.set(row['guild_id'], row['prefix'])
        })
        console.log('[MySQL]: Prefixes loaded.')
    });
    await client.user.setActivity(process.env.DISCORD_PREFIX+'help | mrthebank.maxnus.com', { type: 'PLAYING'});
    console.log("[Discord API]: Logged in as " + client.user.tag)
};