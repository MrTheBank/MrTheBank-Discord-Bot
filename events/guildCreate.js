const { MessageEmbed } = require('discord.js');
const DB = require('../utils/database.js');

module.exports = async (client, guild) => {
    await DB.guildCreate(guild);
    return client.channels.cache.get('859356478582030357').send(
        new MessageEmbed()
            .setColor('GREEN')
            .setTitle('New Guild: '+guild.name)
            .setThumbnail(guild.iconURL())
            .setTimestamp()
            .setFooter(guild.id)
    );
};
