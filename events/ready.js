const DB = require('../utils/database.js');

module.exports = async (client) => {
    await DB.db_connect().then(() => {
        console.log('[MySQL]: Connection Successful.');
    });
    await client.user.setActivity(process.env.DISCORD_PREFIX+'help | mrthebank.maxnus.com', { type: 'PLAYING'});
    console.log("[Discord API]: Logged In As " + client.user.tag);
};