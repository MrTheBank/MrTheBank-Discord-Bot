const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {
    await message.channel.send(
        new MessageEmbed()
            .setTitle('<a:email:860725729562329129> เชิญ MrTheBank เข้าเซิฟเวอร์')
            .setColor('RED')
            .setDescription('https://mrthebank.maxnus.com/invite')
    );
};