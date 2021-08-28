const p = require('path');
const fs = require('fs').promises;

const { token, client_id, guild_id } = require('./config/deploy-commands');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' }).setToken(token);

async function registerCommands(path='', results = []) {
    let files = await fs.readdir('./commands/'+path, {withFileTypes: true});
    for (let file of files) {
        let fullPath = p.join(path, file.name);
        if (file.isDirectory()) {
            await registerCommands(fullPath, results);
        } else {
            const command = require('./commands/'+fullPath);
            if (command.interaction) {
                console.log('[Command Manager]: Added \''+command.name+'\' to array.');
                results.push(command.interaction.toJSON());
            }
        }
    }
    return results;
}

(async () => {
    try {
        const commands = await registerCommands();

        if (process.argv[2] === 'dev') {
            await rest.put(
                Routes.applicationGuildCommands(client_id, guild_id),
                { body: commands },
            );
            console.log('Successfully registered application commands to development.');
        } else {
            await rest.put(
                Routes.applicationCommands(client_id),
                { body: commands },
            );
            console.log('Successfully registered application commands to production.');
        }
    } catch (error) {
        console.error(error);
    }
})();
