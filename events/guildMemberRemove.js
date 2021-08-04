const { MessageEmbed } = require('discord.js');
const DB = require('../utils/database.js');

module.exports = async (client, member) => {
    const info = await DB.guildMemberMSG_get('leave_msg', member.guild.id);
    if (info) {
        let message = info.message.replace('<discord_tag>', member.user.toString())
        return client.channels.cache.get(info.channel_id).send(
            new MessageEmbed()
                .setColor('#CC0000')
                .setTitle(member.user.tag+' ได้ออกจาก '+member.guild.name)
                .setDescription(message)
                .setThumbnail(member.user.displayAvatarURL({format:'png', size: 128}))
                .setFooter(member.user.id)
                .setTimestamp()
        )
    }
};
