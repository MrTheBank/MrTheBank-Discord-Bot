const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const DiscordTogether = require('../../utils/discord-together');

module.exports = {
    name: 'together',

    interaction: new SlashCommandBuilder()
        .setName('together')
        .setDescription('Create together channel')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Together')
                .addChoice('Youtube Together', 'youtube')
                .addChoice('Poker Night', 'poker')
                .addChoice('Chess in the Park', 'chess')
                .addChoice('Betrayal.io', 'betrayal')
                .addChoice('Fishington.io', 'fishing')
                .addChoice('Letter Tile', 'lettertile')
                .addChoice('Words Snack', 'wordsnack')
                .addChoice('Doodle Crew', 'doodlecrew')
                .addChoice('SpellCast', 'spellcast')
                .addChoice('Awkword', 'awkword')
                .addChoice('Puttparty', 'puttparty')
                .addChoice('Sketchheads', 'sketchheads')
                .addChoice('Ocho', 'ocho')
                .setRequired(true)
        )
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const together = {
            youtube:"YouTube Together",
            poker:"Poker Night",
            chess:"Chess in the Park",
            betrayal:"Betrayal.io",
            fishing:"Fishington.io",
            lettertile:"Letter Tile",
            wordsnack:"Words Snack",
            doodlecrew:"Doodle Crew",
            spellcast:"SpellCast",
            awkword:"Awkword",
            puttparty:"Puttparty",
            sketchheads:"Sketchheads",
            ocho:"Ocho"
        };

        if (!ctx.action.member.voice.channel) return ctx.sendEmbed(new MessageEmbed()
            .setColor('#E00000')
            .setDescription('กรุณาเข้าห้องพูดคุย (Voice Channel) ก่อนพิมพ์คำสั่งนี้')
        );

        const arg = ctx.type === 'interaction' ? ctx.options.getString('type') : together[ctx.args.join(' ')] ? ctx.args.join(' ') : null;

        if (arg) {
            ctx.client.discordTogether = new DiscordTogether(ctx.client);
            await ctx.client.discordTogether.createTogetherCode(ctx.action.member.voice.channelId, arg).then(invite => {
                return ctx.sendMSG('สร้างห้อง '+together[arg]+' ให้เรียบร้อย กรุณาคลิกที่ลิงค์\n'+invite.code);
            });
        } else {
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ไม่พบประเภทที่ท่านระบุ')
            );
        }
    }
}
