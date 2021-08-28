const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {
    const ping = Date.now() - message.createdTimestamp;
    const ping_api = Math.round(client.ws.ping);
    await message.channel.send(
        new MessageEmbed()
            .setColor('BLUE')
            .setDescription('ความล่าช้า: `'+ping+'ms`\n' +
                'ความล่าช้า API: `'+ping_api+'ms`')
    );
};