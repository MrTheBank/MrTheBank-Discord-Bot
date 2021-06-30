const { MessageEmbed } = require("discord.js");
const axios = require("axios");

exports.run = async (client, message) => {
    await axios.get('https://aws.random.cat/meow').then(function (response) {
        return message.channel.send(
            new MessageEmbed()
                .setColor("PURPLE")
                .setTitle('สุ่มรูปภาพแมว')
                .setImage(response.data.file)
        );
    });
}