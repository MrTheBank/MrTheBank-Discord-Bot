const DB = require('../utils/database.js');

module.exports = async (client) => {
    await DB.db_connect().then(() => {
        console.log('[MySQL]: Connection Successful.');
    });
    console.log("[Discord API]: Logged In As " + client.user.tag);
};