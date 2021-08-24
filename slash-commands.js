const fs = require('fs');
const { token, client_id, guild_id } = require('./config/slash-commands');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];

const rest = new REST({ version: '9' }).setToken(token);

function registerCommands(path='') {
    return new Promise(resolve => {
        fs.readdir('./commands/'+path, (err, files) => {
            files.forEach(file => {
                if (fs.statSync('./commands/'+path+file).isDirectory()) {
                    // Recursive to read sub-folders.
                    resolve(registerCommands(path + '/' + file + '/'));
                } else {
                    const command = require('./commands/'+path+file);
                    if (command.interaction) {
                        resolve(commands.push(command.interaction.toJSON()));
                    }
                }
            });
        });
    });
}

try {
    registerCommands().then(async () => {
        await rest.put(
            Routes.applicationGuildCommands(client_id, guild_id),
            { body: commands },
        );

        console.log('Successfully registered application commands.');
    });
} catch (error) {
    console.error(error);
}
