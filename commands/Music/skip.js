const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'skip',

    interaction: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('ข้ามเพลงที่กำลังเล่นอยู่')
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

        if (queue.skip()) {
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#33cc33')
                .setDescription('เพลง `'+ queue.current.title +'` ถูกข้ามเรียบร้อย')
            );
        } else {
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('เกิดข้อผิดพลาดในการข้ามเพลง กรุณาลองใหม่')
            );
        }
    }
}