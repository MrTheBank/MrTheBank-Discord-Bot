const fs = require('fs');
const { registerCommands } = require('../commands-handler/command-handler');
const { registerInteractions } = require('../commands-handler/interaction-handler');
const { registerPrefixes } = require('../commands-handler/prefix-handler');
const { initDatabase } = require('../database/mongoose-handler');
const { registerMusic } = require('../commands-handler/music-handler');

module.exports = {
    init(client, timestamp) {
        registerCommands();
        registerInteractions();
        initDatabase();
        registerMusic(client);

        this.initEvents(client);
        this.initEssentialEvents(client, timestamp);
    },

    initEssentialEvents(client, timestamp) {
        client.once('ready', async () => {
            await registerPrefixes(client);

            console.log('[Discord API]: Launched successful in '+(Date.now()-timestamp) / 1000+' seconds');
        });
    },

    initEvents(client) {
        fs.readdir('./event-handler/events/', (err, files) => {
            if (err) return console.error(err);
            files.forEach((f) => {
               const event = require('./events/'+f);
               let eventName = f.split('.')[0];
               client.on(eventName, event.bind(null, client));
            });
        });
    }
}
