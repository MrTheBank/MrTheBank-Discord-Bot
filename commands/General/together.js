const { MessageEmbed } = require("discord.js");
const { DiscordTogether } = require('discord-together');

exports.run = async (client, message, args) => {
    const together = ["youtube", "poker", "chess", "betrayal", "fishing"], together_name = {youtube:"YouTube Together",poker:"Poker",chess:"Chess",betrayal:"Betrayal",fishing:"Fishing"};

    const channel = message.member.voice.channel;
    const prefix = process.env.DISCORD_PREFIX;

    if (!args[0]) {
        return message.channel.send(
            new MessageEmbed()
                .setColor('BLUE')
                .setTitle('<a:gameboy:860522412121522216> คำสั่ง Discord Together')
                .addFields(
                    { name: 'เปิดห้อง YouTube', value: '`'+prefix+'together youtube`', inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'เปิดห้อง Poker', value: '`'+prefix+'together poker`', inline: true },
                    { name: 'เปิดห้อง Chess', value: '`'+prefix+'together chess`', inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'เปิดห้อง Betrayal', value: '`'+prefix+'together betrayal`', inline: true },
                    { name: 'เปิดห้อง Fishing', value: '`'+prefix+'together fishing`', inline: true },
                )
                .setFooter(message.author.tag, message.author.displayAvatarURL({format:'png',size:32}))
                .setTimestamp()
        )
    }

    if (args.length > 1) return message.channel.send(
        new MessageEmbed()
            .setColor('#E00000')
            .setDescription('ไม่พบ Argument ที่ท่านระบุ')
    )

    if (!channel) return message.channel.send(
        new MessageEmbed()
            .setColor('#E00000')
            .setDescription('กรุณาเข้าห้องพูดคุย (Voice Channel) ก่อนพิมพ์คำสั่งนี้')
    );

    if (together.includes(args[0])) {
        client.discordTogether = new DiscordTogether(client);
        client.discordTogether.createTogetherCode(message.member.voice.channelID, args[0]).then(async invite => {
           return message.channel.send('สร้างห้อง '+together_name[args[0]]+' ให้เรียบร้อย กรุณาคลิกที่ลิงค์\n'+invite.code);
        });
    } else {
        return message.channel.send('ไม่พบ Argument ที่ท่านระบุ');
    }
};