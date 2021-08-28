const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'discord',

    interaction: new SlashCommandBuilder()
        .setName('discord')
        .setDescription('Show MrTheBank\'s Official discord link')
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        await ctx.sendMSG('<a:discord_spinning:861131405534822401> เข้า MrTheBank\'s Official Discord:\nhttps://discord.gg/vJdWa57HbX');
    }
}
