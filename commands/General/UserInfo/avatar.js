const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const Avatar = require('../../../utils/avatar');

module.exports = {
    name: 'avatar',

    interaction: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Show discord avatar')
        .addStringOption(option => option.setName('name').setDescription('Discord nickname'))
        .addUserOption(option => option.setName('user').setDescription('Discord user'))
        .addStringOption(option => option.setName('snowflake').setDescription('Discord snowflake ID'))
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        let result;

        switch (true) {
            case Avatar.isUser(ctx):
                result = await Avatar.findUser(ctx);
                break;
            case Avatar.isSnowflake(ctx):
                result = await Avatar.findSnowflake(ctx);
                break;
            case Avatar.isName(ctx):
                result = await Avatar.findName(ctx);
                break;
            default:
                result = ctx.action.user || ctx.action.author;
        }

        if (result) {
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('GREEN')
                .setImage(result.displayAvatarURL({format:'png',size:512}))
                .setDescription('รูปโปรไฟล์ของ `'+result.tag+'`: [ลิงค์]('+result.displayAvatarURL({format:'png',size:512})+')')
            );
        } else {
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ไม่พบข้อมูลที่ท่านต้องการค้นหา')
            );
        }
    }
}
