const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { ms, s, m, h, d } = require('time-convert');
const fs = require('fs');
const configBot = require('../../../config/bot');

module.exports = {
    name: 'botinfo',

    interaction: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Show bot information')
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const client = ctx.client;

        const version = await fs.readFileSync('./version.txt', 'utf8');
        const uptime = ms.to(d,h,m,s)(Math.floor(process.uptime()*1000));
        const memory_usage = Math.round((process.memoryUsage().heapUsed / 1024 / 1024)*100) / 100;

        const users = client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c);

        const prefix = client.prefixes.get(ctx.action.guild.id) || configBot.prefix;
        await ctx.sendEmbed(
            new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('<:info:861152809385852968> ข้อมูลบอท')
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription('**'+client.user.tag+'**\n' +
                    'Prefix: `'+prefix+'`\n\n' +
                    'ไอดี: `'+client.user.id+'`\n' +
                    'จำนวนเซิฟเวอร์: `'+client.guilds.cache.size+'`\n' +
                    'จำนวนช่อง: `'+client.channels.cache.size+'`\n' +
                    'จำนวนผู้ใช้งาน: `'+users+'`\n' +
                    'จำนวนการใช้แรม: `'+memory_usage+'MB`\n' +
                    'เวลาทำงาน: `'+uptime[0]+' วัน '+uptime[1]+' ชั่วโมง '+uptime[2]+' นาที '+uptime[3]+' วินาที`')
                .setFooter('เขียนด้วย discord.js • Build '+version)
        );
    }
}
