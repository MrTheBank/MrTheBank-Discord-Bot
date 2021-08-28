const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'server',

    interaction: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Show server information')
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const guild = ctx.action.guild;

        let levelBoost = {
            'NONE': 'ไม่มี',
            'TIER_1': 'เลเวล 1',
            'TIER_2': 'เลเวล 2',
            'TIER_3': 'เลเวล 3'
        };

        let created = new Date(guild.createdTimestamp).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            era: 'short'
        });

        await guild.members.fetch();

        await ctx.sendEmbed(new MessageEmbed()
            .setColor('BLUE')
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .setDescription('' +
                '**Guild ID:** `'+guild.id+'`\n' +
                '**Shard ID:** '+guild.shardId)
            .addFields(
                { name: '**ชื่อ**', value: guild.name, inline: true },
                { name: '**เลเวลบูสท์**', value: levelBoost[guild.premiumTier], inline: true },
                { name: '**เจ้าของ**', value: '<@'+guild.ownerId+'>', inline: true },
                { name: '**สมาชิก: **'+guild.memberCount, value: '' +
                        'ผู้ใช้งาน: ' + guild.members.cache.filter(member => !member.user.bot).size + '\n' +
                        'บอท: ' + guild.members.cache.filter(member => member.user.bot).size
                    , inline: true },
                { name: '**ช่อง: **'+guild.channels.cache.size, value: '' +
                        'ช่องข้อความ: ' + guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size + '\n' +
                        'ช่องเสียง: ' + guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size
                    , inline: true },
                { name: '**บทบาท: **'+guild.roles.cache.size, value: '' +
                        'บทบาทปกติ: ' + guild.roles.cache.filter(role => !role.managed).size + '\n' +
                        'บทบาทอัตโนมัติ: ' + guild.roles.cache.filter(role => role.managed).size
                    , inline: true },
                { name: '**อีโมจิ**', value: ''+guild.emojis.cache.size, inline: true },
                { name: '**สติ๊กเกอร์**', value: ''+guild.stickers.cache.size, inline: true },
                { name: '**ช่องต้อนรับ**', value: guild.systemChannelId ? '<#'+guild.systemChannelId+'>' : 'ไม่มี', inline: true },
                { name: '**สร้างเมื่อ**', value: created}
            )
        );
    }
}
