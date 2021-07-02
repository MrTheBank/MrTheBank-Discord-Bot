const { MessageAttachment, MessageEmbed } = require("discord.js");
const Canvas = require('canvas');
const wc = require('wordcut');

Canvas.registerFont('./fonts/Trirong.ttf', { family: 'Trirong' });
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

exports.run = async (client, message, args) => {
    let arg = args.join(' ').split('|');
    if (!arg.join()) {
        return message.channel.send(
            new MessageEmbed()
                .setColor("BLUE")
                .setTitle('(MEME) Office Handshake')
                .setImage('https://i.imgur.com/ZEutZEs.jpg')
                .setDescription('วิธีใช้ `'+process.env.DISCORD_PREFIX+'ohs ข้อความที่ 1|ข้อความที่ 2`')
        );
    }

    if (arg.length === 2) {
        const canvas = Canvas.createCanvas(552, 499);
        const ctx = canvas.getContext('2d');
        Canvas.loadImage('./templates/office_handshake.jpg').then(async (i) => {
            ctx.drawImage(i, 0, 0, canvas.width, canvas.height);

            ctx.font = '20px Trirong';
            ctx.fillStyle = '#ffffff';
            await addText(ctx, arg[0], 160, 240, 160, 24);

            ctx.font = '20px Trirong';
            ctx.fillStyle = '#ffffff';
            await addText(ctx, arg[1], 390, 390, 140, 24);

            const attachment = new MessageAttachment(canvas.toBuffer(), 'ohs.jpg');
            return message.channel.send('', attachment);
        });
    } else {
        return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setTitle('รูปแบบคำสั่งผิดพลาด')
                .setDescription('วิธีใช้ `'+process.env.DISCORD_PREFIX+'ohs ข้อความที่ 1|ข้อความที่ 2`')
        );
    }
}