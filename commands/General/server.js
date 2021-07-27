const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {
    const guild = message.guild;
    const region = {
        'us-east':'อเมริกาตะวันออก',
        'us-west':'อเมริกาตะวันตก',
        'us-central':'อเมริกากลาง',
        'us-south':'อเมริกาใต้',
        'singapore':'สิงคโปร์',
        'southafrica':'แอฟริกาใต้',
        'sydney':'ซิดนีย์',
        'europe':'ยุโรป',
        'brazil':'บราซิล',
        'hongkong':'ฮ่องกง',
        'russia':'รัสเซีย',
        'japan':'ญี่ปุ่น',
        'india':'อินเดีย'
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
    return message.channel.send(
        new MessageEmbed()
            .setColor('BLUE')
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .setDescription('' +
                '**Guild ID:** `'+guild.id+'`\n' +
                '**Shard ID:** '+guild.shardID)
            .addFields(
                { name: '**ชื่อ**', value: guild.name, inline: true },
                { name: '**ภูมิภาค**', value: region[guild.region], inline: true },
                { name: '**เจ้าของ**', value: '<@'+guild.ownerID+'>', inline: true },
                { name: '**สมาชิก: **'+guild.memberCount, value: '' +
                        'ผู้ใช้งาน: ' + guild.members.cache.filter(member => !member.user.bot).size + '\n' +
                        'บอท: ' + guild.members.cache.filter(member => member.user.bot).size
                    , inline: true },
                { name: '**ช่อง: **'+guild.channels.cache.size, value: '' +
                        'ช่องข้อความ: ' + guild.channels.cache.filter(channel => channel.type === 'text').size + '\n' +
                        'ช่องเสียง: ' + guild.channels.cache.filter(channel => channel.type === 'voice').size
                    , inline: true },
                { name: '**บทบาท: **'+guild.roles.cache.size, value: '' +
                        'บทบาทปกติ: ' + guild.roles.cache.filter(role => !role.managed).size + '\n' +
                        'บทบาทอัตโนมัติ: ' + guild.roles.cache.filter(role => role.managed).size
                    , inline: true },
                { name: '**อีโมจิ**', value: guild.emojis.cache.size, inline: true },
                { name: '**ช่องต้อนรับ**', value: guild.systemChannelID ? '<#'+guild.systemChannelID+'>' : 'ไม่มี', inline: true },
                { name: '**ช่องไม่เคลื่อนไหว**', value: guild.afkChannelID ? '<#'+guild.afkChannelID+'>' : 'ไม่มี', inline: true },
                { name: '**สร้างเมื่อ**', value: created}
            )
    );
}