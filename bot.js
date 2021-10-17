const { Client } = require('discord.js');
const { intents, prefix } = require('./config/bot');
const eventHandler = require('./event-handler/event-handler');

const client = new Client({
    intents: intents,
    presence: { status: 'online', activities: [{ name: prefix + 'help | /help' }] }
});

eventHandler.init(client, Date.now());

client.login(process.env.DISCORD_TOKEN);
