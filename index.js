require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.prefixes = new Discord.Collection();

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require('./events/'+file);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./commands/', (err1, folders) => {
    if (err1) return console.error(err1);
    folders.forEach((folder) => {
        fs.readdir('./commands/'+folder+'/', (err2, files) => {
            if (err2) return console.error(err2);
            files.forEach((file) => {
                let props = require('./commands/'+folder+'/'+file);
                let commandName = file.split('.')[0];
                console.log('[Command Manager]: Loading '+folder+'/'+commandName);
                client.commands.set(commandName, props);
            });
        });
    });
});

client.login(process.env.DISCORD_TOKEN);