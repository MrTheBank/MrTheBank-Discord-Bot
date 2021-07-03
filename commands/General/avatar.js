const { MessageEmbed } = require('discord.js');
const is_numeric = require('../../utils/is_numeric.js');

exports.run = async (client, message, args) => {
    const arg = args.join(' ');

    if (!arg) {
        return message.channel.send(
            new MessageEmbed()
                .setColor('GREEN')
                .setImage(message.author.displayAvatarURL({format:'png',size:512}))
                .setDescription('รูปโปรไฟล์ของท่าน: [ลิงค์]('+message.author.displayAvatarURL({format:'png',size:512})+')')
        );
    }

    if (arg && message.mentions.users.size) {
        const name = message.mentions.users.first();
        return message.channel.send(
            new MessageEmbed()
                .setColor('GREEN')
                .setImage(name.displayAvatarURL({format:'png',size:512}))
                .setDescription('รูปโปรไฟล์ของ `'+name.tag+'`: [ลิงค์]('+name.displayAvatarURL({format:'png',size:512})+')')
        );
    }

    if (is_numeric(arg) && arg.length === 18) {
        await message.guild.members.fetch();
        const info = message.guild.members.cache.find(user => user.user.id === arg);
        return message.channel.send(
            new MessageEmbed()
                .setColor('GREEN')
                .setImage(info.user.displayAvatarURL({format:'png',size:512}))
                .setDescription('รูปโปรไฟล์ของ `'+info.user.tag+'`: [ลิงค์]('+info.user.displayAvatarURL({format:'png',size:512})+')')
        );
    }

    if (arg && arg.length >= 3) {
        await message.guild.members.fetch();
        const info = message.guild.members.cache.find((user) => {
            if (user.nickname) {
                return user.nickname.toLowerCase().includes(arg.toLowerCase()) || user.user.username.toLowerCase().includes(arg.toLowerCase());
            } else {
                return user.user.username.toLowerCase().includes(arg.toLowerCase());
            }
        });
        if (info) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor('GREEN')
                    .setImage(info.user.displayAvatarURL({format:'png',size:512}))
                    .setDescription('รูปโปรไฟล์ของ `'+info.user.tag+'`: [ลิงค์]('+info.user.displayAvatarURL({format:'png',size:512})+')')
            );
        } else {
            return message.channel.send(
                new MessageEmbed()
                    .setColor('#E00000')
                    .setDescription('ไม่พบชื่อที่ท่านต้องการ')
            );
        }
    } else {
        return message.channel.send(
            new MessageEmbed()
                .setColor('#E00000')
                .setDescription('กรุณาพิมพ์อย่างน้อย 3 ตัว')
        );
    }
};