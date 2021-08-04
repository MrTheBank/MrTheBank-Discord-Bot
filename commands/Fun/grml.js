const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');

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

exports.run = async (client, message, args) => {
    const prefix = client.prefixes.get(message.guild.id) || process.env.DISCORD_PREFIX;

    let arg = args.join(' ');
    if (!arg) {
        return message.channel.send(
            new MessageEmbed()
                .setColor('BLUE')
                .setTitle('(MEME) กูรู้หมดแล้ว')
                .setImage('https://i.imgur.com/hOElsQR.png')
                .setDescription('วิธีใช้ `'+prefix+'grml ข้อความ`')
        );
    } else {
        const canvas = Canvas.createCanvas(600, 451);
        const ctx = canvas.getContext('2d');
        Canvas.loadImage('./templates/grml.png').then(async (i) => {
            ctx.drawImage(i, 0, 0, canvas.width, canvas.height);

            const result = await grml(ctx, arg);
            if (result) {
                const attachment = new MessageAttachment(canvas.toBuffer(), 'grml.jpg');
                return message.channel.send('', attachment);
            } else {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor('RED')
                        .setTitle('รูปแบบคำสั่งผิดพลาด')
                        .setDescription('ข้อความยาวเกินไป')
                );
            }
        });
    }
}
