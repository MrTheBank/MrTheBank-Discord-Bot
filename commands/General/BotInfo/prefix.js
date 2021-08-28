const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const configBot = require('../../../config/bot');

module.exports = {
    name: 'prefix',

    interaction: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Show server prefix')
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const prefix = ctx.client.prefixes.get(ctx.action.guild.id) || configBot.prefix;

        await ctx.sendEmbed(new MessageEmbed()
            .setColor('BLUE')
            .setDescription('Prefix ของเซิฟเวอร์นี้คือ `'+prefix+'`')
        );
    }
}
