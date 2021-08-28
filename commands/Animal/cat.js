const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

module.exports = {
    name: 'cat',

    interaction: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Show cat\'s images')
        .addStringOption(option =>
            option.setName('breed')
                .setDescription('Breed')
        )
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const arg = ctx.type === 'interaction' ? ctx.options.getString('breed') : ctx.args.join(' ');

        let breed;
        try {
            breed = await axios.get('https://api.thecatapi.com/v1/breeds/search?q='+arg);
            breed.data[0].id;
        } catch (e) {
            breed = null;
        }

        if (breed) {
            await axios.get('https://api.thecatapi.com/v1/images/search?breed_ids='+breed.data[0].id).then((response) => {
                return ctx.sendEmbed(new MessageEmbed()
                    .setColor('PURPLE')
                    .setTitle('สุ่มรูปภาพแมว ('+breed.data[0].name+')')
                    .setImage(response.data[0].url)
                );
            });
        } else {
            await axios.get('https://api.thecatapi.com/v1/images/search?size=med').then((response) => {
                return ctx.sendEmbed(new MessageEmbed()
                    .setColor('PURPLE')
                    .setTitle('สุ่มรูปภาพแมว')
                    .setImage(response.data[0].url)
                );
            });
        }
    }
}
