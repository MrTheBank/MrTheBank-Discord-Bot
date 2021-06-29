const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
    await message.channel.send(
        new MessageEmbed()
            .setAuthor("เชิญฉันเข้าเซิฟเวอร์", "https://img.icons8.com/ultraviolet/2x/email-open--v2.gif")
            .setColor("RED")
            .setDescription("https://mrthebank.maxnus.com/invite")
    );
};