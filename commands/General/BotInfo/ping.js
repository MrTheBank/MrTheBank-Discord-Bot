const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',

    interaction: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Show bot ping')
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const ping_api = Math.round(ctx.client.ws.ping);
        await ctx.sendMSG('กำลังโหลด').then(async (msg) => {
            const ping = msg.createdTimestamp - ctx.action.createdTimestamp;
            let embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription('ความล่าช้า: `' + ping + 'ms`\n' +
                    'ความล่าช้า API: `' + ping_api + 'ms`');
            await ctx.editEmbed(embed, false, {}, msg)
        });
    }
}
