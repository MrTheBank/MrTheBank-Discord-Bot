const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'now',

    interaction: new SlashCommandBuilder()
        .setName('now')
        .setDescription('แสดงเพลงปัจจุบันและเวลาของเพลง')
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

        const timestamp = queue.getPlayerTimestamp();

        // if (timestamp.progress == 'Infinity') console.log('live');

        // await ctx.sendMSG(`${progress} (**${timestamp.progress}**%)`)
        const track = queue.current;

        let progress = timestamp.progress == 'Infinity' ? '' : queue.createProgressBar() + ' (**' + timestamp.progress + '**%)';
        await ctx.sendEmbed(new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(track.title)
            .setURL(track.url)
            .setDescription(progress + '\n')
            .setThumbnail(track.thumbnail)
            .setFooter('ร้องขอโดย: '+ track.requestedBy.tag, track.requestedBy.displayAvatarURL())
        );
    }
}