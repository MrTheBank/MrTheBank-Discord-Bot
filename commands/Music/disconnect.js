const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'disconnect',

    interaction: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('หยุดเพลงและออกจากห้องพูดคุย')
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const queue = ctx.client.player.getQueue(ctx.action.guild.id);

        if (!queue || !queue.playing) {
            return ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ไม่มีเพลงเล่น ณ เวลานี้')
            );
        } else {
            queue.destroy();
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#0099ff')
                .setDescription('บอทได้หยุดเพลงและออกจากห้องพูดคุยเรียบร้อย')
            );
        }
    }
}