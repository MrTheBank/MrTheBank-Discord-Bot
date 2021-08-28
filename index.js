require('dotenv').config();

const { ShardingManager } = require('discord.js');
const { closeDatabase } = require('./database/mongoose-handler');
const manager = new ShardingManager('./bot.js', { token: process.env.DISCORD_TOKEN });

closeDatabase();
manager.on('shardCreate', (shard => {
    console.log('[Discord API]: Launched shard #' + shard.id);
}));
manager.spawn();
