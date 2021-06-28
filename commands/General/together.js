const { MessageEmbed } = require("discord.js");
const { DiscordTogether } = require('discord-together');

exports.run = async (client, message, args) => {
    const together = ["youtube", "poker", "chess", "betrayal", "fishing"];
    const together_name = {youtube:"YouTube Together",poker:"Poker",chess:"Chess",betrayal:"Betrayal",fishing:"Fishing"};

    const channel = message.member.voice.channel;
    const prefix = process.env.DISCORD_PREFIX;

    if (!channel) return message.channel.send(
        "กรุณาเข้าห้องพูดคุย (Voice Channel) ก่อนพิมพ์คำสั่งนี้"
    );

    if (!args[0]) {
        return message.channel.send(
            new MessageEmbed()
                .setTitle("❔ คำสั่ง "+prefix+"together")
                .addFields(
                    { name: 'เปิดห้อง YouTube', value: '`'+prefix+'together youtube`', inline: true },
                    { name: 'เปิดห้อง Poker', value: '`'+prefix+'together poker`', inline: true },
                    { name: 'เปิดห้อง Chess', value: '`'+prefix+'together chess`', inline: true },
                    { name: 'เปิดห้อง Betrayal', value: '`'+prefix+'together betrayal`', inline: true },
                    { name: 'เปิดห้อง Fishing', value: '`'+prefix+'together fishing`', inline: true },
                )
                .setColor("BLUE")
        )
    }

    if (args.length > 1) return message.channel.send(
        'ไม่พบ Argument ที่ท่านระบุ'
    )

    if (together.includes(args[0])) {
        client.discordTogether = new DiscordTogether(client);
        client.discordTogether.createTogetherCode(message.member.voice.channelID, args[0]).then(async invite => {
           return message.channel.send('สร้างห้อง '+together_name[args[0]]+' ให้เรียบร้อย กรุณาคลิกที่ลิงค์\n'+invite.code);
        });
    } else {
        return message.channel.send('ไม่พบ Argument ที่ท่านระบุ');
    }
};