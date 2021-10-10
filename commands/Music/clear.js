const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'clear',

    interaction: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('ลบเพลงทั้งหมดในคิว')
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        if (!ctx.action.member.voice.channel) return ctx.sendEmbed(new MessageEmbed()
            .setColor('#E00000')
            .setDescription('กรุณาเข้าห้องพูดคุย (Voice Channel) ก่อนพิมพ์คำสั่งนี้')
        );

        const queue = ctx.client.player.getQueue(ctx.action.guild.id);

        if (queue.connection.channel.id !== ctx.action.member.voice.channelId) return ctx.sendEmbed(new MessageEmbed()
            .setColor('#E00000')
            .setDescription('กรุณาเข้าห้องพูดคุยที่บอทกำลังอยู่ <#' + queue.connection.channel.id + '>')
        );

        if (!queue || !queue.playing) return ctx.sendEmbed(new MessageEmbed()
            .setColor('#E00000')
            .setDescription('ไม่มีเพลงเล่น ณ เวลานี้')
        );

        if (!queue.tracks[0]) return ctx.sendEmbed(new MessageEmbed()
            .setColor('#E00000')
            .setDescription('ไม่มีเพลงอยู่ในคิว')
        );

        await queue.clear();
        await ctx.sendEmbed(new MessageEmbed()
            .setColor('#33cc33')
            .setDescription('คิวของเพลงถูกลบเรียบร้อย')
        );
    }
}