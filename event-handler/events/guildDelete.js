const { guild_events_channel_id } = require('../../config/bot');
const { MessageEmbed } = require('discord.js');
const DB = require('../../database/mongoose-handler');

module.exports = async (client, guild) => {
    await DB.guildDelete(guild);
    return client.channels.cache.get(guild_events_channel_id).send(
        {
            embeds: [
                new MessageEmbed()
                    .setColor('RED')
                    .setTitle('Removed Guild: ' + guild.name)
                    .setThumbnail(guild.iconURL())
                    .setTimestamp()
                    .setFooter(guild.id)
            ]
        }
    );
}
