const { Client } = require('discord.js');
const { intents } = require('./config/bot');
const eventHandler = require('./event-handler/event-handler');

const client = new Client({ intents: intents });

eventHandler.init(client, Date.now());

client.login(process.env.DISCORD_TOKEN);
