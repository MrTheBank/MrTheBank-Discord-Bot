const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
const configBot = require('../../config/bot');

Canvas.registerFont('./templates/fonts/sukhumvitb.ttf', { family: 'Sukhumvit' });

async function grml(ctx, text) {
    let maxWidth = 410;
    ctx.font = '50px Sukhumvit';
    ctx.fillStyle = '#ab1b34';
    let testWidth = ctx.measureText(text).width;
    if (testWidth < maxWidth) {
        ctx.save();
        ctx.translate(0, 0)
        ctx.rotate(-0.0065*Math.PI);
        ctx.fillText(text, 35, 210);
        ctx.restore();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    name: 'grml',

    interaction: new SlashCommandBuilder()
        .setName('grml')
        .setDescription('Generate กูรู้หมดแล้ว meme')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message')
        )
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const prefix = ctx.client.prefixes.get(ctx.action.guild.id) || configBot.prefix;

        const arg = ctx.type === 'interaction' ? ctx.options.getString('message') : ctx.args.join(' ');

        if (arg) {
            const canvas = Canvas.createCanvas(600, 451);
            const context = canvas.getContext('2d');
            await Canvas.loadImage('./templates/grml.png').then(async (i) => {
                context.drawImage(i, 0, 0, canvas.width, canvas.height);

                const result = await grml(context, arg);
                if (result) {
                    const attachment = new MessageAttachment(canvas.toBuffer(), 'grml.jpg');
                    return ctx.sendFiles([attachment]);
                } else {
                    return ctx.sendEmbed(new MessageEmbed()
                        .setColor('RED')
                        .setTitle('รูปแบบคำสั่งผิดพลาด')
                        .setDescription('ข้อความยาวเกินไป')
                    );
                }
            });
        } else {
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('BLUE')
                .setTitle('(MEME) กูรู้หมดแล้ว')
                .setImage('https://i.imgur.com/hOElsQR.png')
                .setDescription('วิธีใช้ `'+prefix+'grml ข้อความ`')
            );
        }
    }
}
