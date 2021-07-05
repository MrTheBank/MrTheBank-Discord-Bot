const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {
    const prefix = client.prefixes.get(message.guild.id) || process.env.DISCORD_PREFIX;

    return message.channel.send(
        new MessageEmbed()
            .setColor('BLUE')
            .setDescription('Prefix ของเซิฟเวอร์นี้คือ `'+prefix+'`')
    );
}