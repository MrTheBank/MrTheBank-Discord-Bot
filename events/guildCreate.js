const { MessageEmbed } = require("discord.js");
const DB = require('../utils/database.js');

module.exports = async (client, guild) => {
    await DB.guild_check(guild).then(r => {
        if (r) {
            // Guild is existed in database so we just update it.
            DB.guild_create(guild, true);
        } else {
            // Guild is not existed in database so insert new one.
            DB.guild_create(guild);
        }
    });
    return client.channels.cache.get('859356478582030357').send(
        new MessageEmbed()
            .setColor("GREEN")
            .setTitle('New Guild: '+guild.name)
            .setThumbnail(guild.iconURL())
            .setTimestamp()
            .setFooter(guild.id)
    );
};