const { MessageEmbed } = require('discord.js');
const DB = require('../../utils/database.js');

exports.run = async (client, message, args) => {
    if (message.member.hasPermission('MANAGE_GUILD')) {
        const arg = args.join(' ');
        if (arg) {
            const length = arg.length;
            if (arg === '+') {
                await DB.default_prefix(message.guild.id);

                client.prefixes.delete(message.guild.id);
                return message.channel.send(
                    new MessageEmbed()
                        .setColor('#00E000')
                        .setDescription('เปลี่ยน Prefix ของเซิฟเวอร์นี้เป็น `'+arg+'`')
                );
            } else if (length >= 1 && length <= 5) {
                await DB.set_prefix(message.guild.id, arg);

                client.prefixes.set(message.guild.id, arg);
                return message.channel.send(
                    new MessageEmbed()
                        .setColor('#00E000')
                        .setDescription('เปลี่ยน Prefix ของเซิฟเวอร์นี้เป็น `'+arg+'`')
                );
            } else {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor('#E00000')
                        .setDescription('ตัวอักษรต้องไม่น้อยกว่า 1 และไม่มากกว่า 5')
                );
            }
        } else {
            return message.channel.send(
                new MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('ตั้ง Prefix สำหรับเซิฟเวอร์ท่าน')
                    .setDescription('การตั้ง Prefix มีเงื่อนไขดังนี้\n\n' +
                        '• ตัวอักษรไม่น้อยกว่า 1 และไม่มากกว่า 5\n' +
                        '• ไม่มีช่องว่าง (Space) ขึ้นหน้า')
            );
        }
    } else {
        return message.channel.send(
            new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ท่านไม่มีเพอมิชชั่น `MANAGE_GUILD`')
        );
    }
};