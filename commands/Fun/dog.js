const { MessageEmbed } = require('discord.js');
const axios = require('axios');

exports.run = async (client, message, args) => {
    const arg = args.join('-').toLowerCase();

    if (arg === 'ไอ้แจ็ค') {
        return message.channel.send(
            new MessageEmbed()
                .setColor('PURPLE')
                .setTitle('รศ.ดร.วีรชัย อ...ารายสั่กอย่าง กลัวสะกดนามสกุลผิด')
                .setImage('https://i.imgur.com/Rm0cWN6.png')
        );
    }

    if (arg) {
        await axios.get('https://dog.ceo/api/breed/'+arg+'/images/random').then(function (response){
            return message.channel.send(
                new MessageEmbed()
                    .setColor('PURPLE')
                    .setTitle('สุ่มรูปภาพสุนัข ('+arg+')')
                    .setImage(response.data.message)
            );
        }).catch(function (err) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor('DARK_RED')
                    .setDescription('ไม่พบพันธ์สุนัขที่ท่านเรียก')
            );
        });
    } else {
        await axios.get('https://dog.ceo/api/breeds/image/random').then(function (response) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor('PURPLE')
                    .setTitle('สุ่มรูปภาพสุนัข')
                    .setImage(response.data.message)
            );
        });
    }
}