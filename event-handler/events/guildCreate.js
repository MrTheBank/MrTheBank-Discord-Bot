const { guild_events_channel_id } = require('../../config/bot');
const { MessageEmbed } = require('discord.js');
const DB = require('../../database/mongoose-handler');

module.exports = async (client, guild) => {
    await DB.guildCreate(guild);
    return client.channels.cache.get(guild_events_channel_id).send(
        {
            embeds: [
                new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('New Guild: '+guild.name)
                    .setThumbnail(guild.iconURL())
                    .setTimestamp()
                    .setFooter(guild.id)
            ]
        }
    );
}
