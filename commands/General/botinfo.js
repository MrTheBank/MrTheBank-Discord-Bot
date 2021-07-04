const { MessageEmbed } = require('discord.js');
const { ms, s, m, h, d } = require('time-convert');
const fs = require('fs');

exports.run = async (client, message) => {
    const version = await fs.readFileSync('./version.txt', 'utf8');
    const uptime = ms.to(d,h,m,s)(Math.floor(process.uptime()*1000));

    const users = message.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c);

    await message.channel.send(
        new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('<:info:861152809385852968> ข้อมูลบอท')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription('\u200B\n' +
                'ไอดี: `'+client.user.id+'`\n' +
                'จำนวนเซิฟเวอร์: `'+client.guilds.cache.size+'`\n' +
                'จำนวนช่อง: `'+client.channels.cache.size+'`\n' +
                'จำนวนผู้ใช้งาน: `'+users+'`\n' +
                'เวลาทำงาน: `'+uptime[0]+' วัน '+uptime[1]+' ชั่วโมง '+uptime[2]+' นาที '+uptime[3]+' วินาที`')
            .setFooter('เขียนด้วย discord.js • Build '+version)
    );
};