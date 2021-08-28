const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
const wc = require('wordcut');
const configBot = require('../../config/bot');

Canvas.registerFont('./templates/fonts/Trirong.ttf', { family: 'Trirong' });
wc.init();

function addText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = wc.cutIntoArray(text), line = '';

    for (let n=0; n<words.length; n++) {
        let testLine = line + words[n];
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
        ctx.textAlign = 'center';
    }
    ctx.fillText(line, x, y);
}

module.exports = {
    name: 'ohs',

    interaction: new SlashCommandBuilder()
        .setName('ohs')
        .setDescription('Generate Office Handshake meme')
        .addStringOption(option =>
            option.setName('message_1')
                .setDescription('Message 1')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message_2')
                .setDescription('Message 2')
                .setRequired(true)
        )
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const prefix = ctx.client.prefixes.get(ctx.action.guild.id) || configBot.prefix;

        let arg = [];
        if (ctx.type === 'interaction') {
            arg[0] = ctx.options.getString('message_1');
            arg[1] = ctx.options.getString('message_2');
        } else {
            arg = ctx.args.join(' ').split('|');
        }

        if (!arg.join()) {
            return await ctx.sendEmbed(new MessageEmbed()
                .setColor('BLUE')
                .setTitle('(MEME) Office Handshake')
                .setImage('https://i.imgur.com/ZEutZEs.jpg')
                .setDescription('วิธีใช้ `'+prefix+'ohs ข้อความที่ 1|ข้อความที่ 2`')
            );
        }

        if (arg.length === 2) {
            const canvas = Canvas.createCanvas(552, 484);
            const context = canvas.getContext('2d');
            await Canvas.loadImage('./templates/office_handshake.jpg').then(async (i) => {
                context.drawImage(i, 0, 0, canvas.width, canvas.height);

                context.font = '20px Trirong';
                context.fillStyle = '#ffffff';
                await addText(context, arg[0], 160, 240, 160, 24);

                context.font = '20px Trirong';
                context.fillStyle = '#ffffff';
                await addText(context, arg[1], 390, 390, 140, 24);

                const attachment = new MessageAttachment(canvas.toBuffer(), 'ohs.jpg');
                return ctx.sendFiles([attachment]);
            });
        } else {
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('RED')
                .setTitle('รูปแบบคำสั่งผิดพลาด')
                .setDescription('วิธีใช้ `'+prefix+'ohs ข้อความที่ 1|ข้อความที่ 2`')
            );
        }
    }
}
