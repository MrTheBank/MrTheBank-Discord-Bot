const configBot = require('../../config/bot');
const commandHandler = require('../../commands-handler/command-handler');
const Ctx = require('../../commands-handler/Ctx');

module.exports = async (client, message) => {
    // Prefix
    const prefix = client.prefixes.get(message.guild.id) || configBot.prefix;

    // Don't listen to bot messages
    if (message.author.bot) return;

    // Don't listen to DMs
    if (!message.guild) return;

    // Check command
    const commandCheck = await commandHandler.getCommandData(message, prefix);
    if (!commandCheck) return;

    const {command, args} = commandCheck;

    // Execute the command
    const ctx = new Ctx({client: client, message: message, command: command.name, args: args}, 'message');

    await commandHandler.runCommand(ctx);
}
