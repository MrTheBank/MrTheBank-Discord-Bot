const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");
const { leave_on_empty } = require("../../config/bot");
const playdl = require("play-dl");

module.exports = {
    name: 'play',

    interaction: new SlashCommandBuilder()
        .setName('play')
        .setDescription('เปิดเพลงจาก YouTube, Spotify หรือ Soundcloud')
        .addStringOption(option => option.setName('query').setDescription('ชื่อเพลงหรือลิงค์เพลง').setRequired(true))
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const arg = ctx.type === 'interaction' ? ctx.options.getString('query') : ctx.args.join(' ');

        if (!ctx.action.member.voice.channel) {
            return ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('กรุณาเข้าห้องพูดคุย (Voice Channel) ก่อนพิมพ์คำสั่งนี้')
            );
        }

        if (!arg) {
            return ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('กรุณาป้อนค่าชื่อเพลงหรือลิงค์เพลงที่ท่านต้องการหา')
            );
        }
        // } else if (arg.includes('spotify.com')) {
        //     return ctx.sendEmbed(new MessageEmbed()
        //         .setColor('#E00000')
        //         .setDescription('ขออภัย ขณะนี้ยังไม่รับรอง Spotify')
        //     );
        // }

        if (ctx.type === 'interaction') ctx.action.deferReply();

        const res = await ctx.client.player.search(arg, {
                requestedBy: ctx.action.member,
                searchEngine: QueryType.AUTO
            })

        if (!res || !res.tracks.length) return ctx.sendEmbed(new MessageEmbed()
            .setColor('#E00000')
            .setDescription('ไม่พบเพลงที่ท่านต้องการหา')
        , true);

        const queue = await ctx.client.player.createQueue(ctx.action.guild, {
            metadata: ctx.action.channel,
            leaveOnEnd: false,
            leaveOnEmptyCooldown: leave_on_empty * 1000,
        });

        if (!queue.createStream) {
            queue.createStream = async (track, source, _queue) => {
                if (source === "youtube") {
                    if (playdl.sp_validate(track.url)) {
                        if (playdl.is_expired()) {
                            await playdl.refreshToken();
                        }
                        let spotifyInfo = await playdl.spotify(track.url);
                        let youtube = await playdl.search(`${spotifyInfo.name}`, {
                            limit: 1,
                        });
                        return (await playdl.stream(youtube[0].url)).stream;
                    }

                    return (await playdl.stream(track.url)).stream;
                }
            };
        }

        try {
            if (!queue.connection) await queue.connect(ctx.action.member.voice.channel);
        } catch {
            await ctx.client.player.deleteQueue(ctx.action.member.voice.channel.guild.id);
            return ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ไม่สามารถเข้าห้องที่ท่านอยู่ กรุณาลองใหม่')
            , true);
        }

        if (res.playlist) {
            queue.addTracks(res.tracks);
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#0099ff')
                .setDescription('เพิ่มเพลงจาก [Playlist]('+ res.playlist.url +') จำนวน **'+ res.tracks.length +'** เพลงเข้าคิว')
            , true);
        } else {
            queue.addTrack(res.tracks[0]);
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#0099ff')
                .setDescription('เพิ่มเพลงเข้าคิว: ['+ res.tracks[0].title +']('+ res.tracks[0].url +')')
            , true);
        }

        if (!queue.playing) await queue.play();
    }
}