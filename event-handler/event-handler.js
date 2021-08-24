const fs = require('fs');
const { registerCommands } = require('../commands-handler/command-handler');
const { registerInteractions } = require('../commands-handler/interaction-handler');

module.exports = {
    init(client, timestamp) {
        registerCommands();
        registerInteractions();

        this.initEssentialEvents(client, timestamp);
        this.initEvents(client);
    },

    initEssentialEvents(client, timestamp) {
        client.once('ready', async () => {
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
        })
    }
}
