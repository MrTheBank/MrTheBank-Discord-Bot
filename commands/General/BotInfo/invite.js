const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',

    interaction: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite MrTheBank Bot to your discord server')
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        await ctx.sendEmbed(new MessageEmbed()
            .setTitle('<a:email:860725729562329129> เชิญ MrTheBank เข้าเซิฟเวอร์')
            .setColor('RED')
            .setDescription('https://mrthebank.maxnus.com/invite')
        );
    }
}
