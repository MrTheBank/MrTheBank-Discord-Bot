const fs = require('fs');
const Discord = require('discord.js');

const interactions = new Discord.Collection();

function registerInteractions(path='') {
    fs.readdir('./commands/'+path, (err, files) => {
        files.forEach(file => {
            if (fs.statSync('./commands/'+path+file).isDirectory()) {
                // Recursive to read sub-folders.
                registerInteractions(path+'/'+file+'/');
            } else {
                const command = require('../commands/'+path+file);

                if (command.interaction) {
                    interactions.set(command.name.toLowerCase(), command);
                }
            }
        });
    });
}

module.exports = {
    registerInteractions,

    async getCommandData(interaction) {
        const command = interactions.get(interaction.commandName);

        if (command) return true;
    },

    async runCommand(ctx) {
        const command = interactions.get(ctx.commandName);

        await command.run(ctx);
    }
}
