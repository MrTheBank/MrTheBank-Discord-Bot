const { MessageEmbed } = require('discord.js');
const DB = require('../utils/database.js');

module.exports = async (client, guild) => {
    await DB.guild_delete(guild);
    return client.channels.cache.get('859356478582030357').send(
        new MessageEmbed()
            .setColor('RED')
            .setTitle('Removed Guild: '+guild.name)
            .setThumbnail(guild.iconURL())
            .setTimestamp()
            .setFooter(guild.id)
    );
};