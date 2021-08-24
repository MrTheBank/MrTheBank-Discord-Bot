const interactionHandler = require('../../commands-handler/interaction-handler');
const Ctx = require('../../commands-handler/Ctx');

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

    // Check command
    const commandCheck = await interactionHandler.getCommandData(interaction);
    if (!commandCheck) return;

    // Execute the command
    const ctx = new Ctx({interaction: interaction}, 'interaction');

    await interactionHandler.runCommand(ctx);
}
