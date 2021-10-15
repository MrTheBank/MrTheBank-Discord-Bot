const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const configBot = require('../../../config/bot');
const axios = require('axios').default;

function addDescription(data, prefix) {
    let res = '';
    Object.entries(data).forEach(command => {
        if (command[0] !== 'category_name' && command[0] !== 'emoji') {
            let option = command[1].query ? ' ['+command[1].query+']' : '';
            res += '`'+prefix+command[1].command+option+'` - '+command[1].description+'\n';
        }
    });
    return res;
}

module.exports = {
    name: 'help',

    interaction: new SlashCommandBuilder()
        .setName('help')
        .setDescription('All bot commands')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category')
                .addChoice('General', 'general')
                .addChoice('Music', 'music')
                .addChoice('Meme', 'meme')
                .addChoice('Animal', 'animal')
                .addChoice('Admin', 'admin')
                .addChoice('Together', 'together')
        )
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const prefix = ctx.client.prefixes.get(ctx.action.guild.id) || configBot.prefix;

        const author = ctx.action.user || ctx.action.author;
        const res = await axios.get('https://static.maxnus.com/mrthebank-discord/commands-th.json');
        const arg = ctx.type === 'interaction' ? ctx.options.getString('category') : res.data.category[ctx.args.join(' ')] ? ctx.args.join(' ') : null;

        if (arg) {
            let data = res.data.category[arg];

            await ctx.sendEmbed(new MessageEmbed()
                .setTitle(data.emoji+' คำสั่ง'+data.category_name)
                .setColor('#6C00FF')
                .setDescription('\u200B\n' + addDescription(data, prefix))
                .setFooter(author.tag, author.displayAvatarURL({format:'png',size:32}))
                .setTimestamp());
        } else {
            let embed = new MessageEmbed()
                .setTitle('<a:mrthebank_question:860447108145741824> คำสั่งทั้งหมด')
                .setColor('#00FFFF')
                .setDescription('บอทนี้ยังเป็นบอทที่อยู่ระหว่างการพัฒนา หากพบเจอปัญหาของบอทนี้ สามารถติดต่อผู้พัฒนาบอทได้ที่ `MrTheBank#5265`')
                .setFooter(author.tag, author.displayAvatarURL({format:'png',size:32}))
                .setTimestamp()
            ;

            await Object.entries(res.data.category).forEach(category => {
                embed.addField(category[1].emoji + ' คำสั่ง' + category[1].category_name, '`' + prefix + 'help ' + category[0] + '`', true)
            });

            await ctx.sendEmbed(embed);
        }
    }
}
