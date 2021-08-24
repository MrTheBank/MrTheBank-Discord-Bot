const fs = require('fs');
const Discord = require('discord.js');

const commands = new Discord.Collection();

function registerCommands(path='') {
    fs.readdir('./commands/'+path, (err, files) => {
        files.forEach(file => {
            if (fs.statSync('./commands/'+path+file).isDirectory()) {
                // Recursive to read sub-folders.
                registerCommands(path+'/'+file+'/');
            } else {
                const command = require('../commands/'+path+file);

                commands.set(command.name.toLowerCase(), command);
            }
        });
    });
}

module.exports = {
    registerCommands,

    async getCommandData(message, prefix) {
        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);

        const commandName = args.shift().toLowerCase();
        const command = commands.get(commandName);

        if (!command) return;

        return { command, args };
    },

    async runCommand(ctx) {
        const command = commands.get(ctx.command);

        await command.run(ctx);
    }
}
