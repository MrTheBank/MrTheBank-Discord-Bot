const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',

    interaction: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('แสดงคิวของเพลง')
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const queue = ctx.client.player.getQueue(ctx.action.guild.id);

        if (!queue || !queue.playing) return ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ไม่มีเพลงเล่น ณ เวลานี้')
        );

        const tracks = queue.tracks.map((track, i) => {
            let trackTitle = track.title.length > 50 ? track.title.substring(0, 50) + '...' : track.title;

            return '**' + (i + 1) + '** - '+ trackTitle;
        });
        const nextSongs = queue.tracks.length > 9 ? '\nและอีก **'+ (queue.tracks.length - 9) +'** เพลง...' : '';

        await ctx.sendEmbed(new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('จำนวนคิวทั้งหมด '+ queue.tracks.length +' เพลง')
            .setDescription(
                '**เพลงปัจจุบัน:** `'+ queue.current.title +'`\n\n' +
                tracks.slice(0, 9).join('\n') + '\n' +
                nextSongs
            )
        );
    }
}