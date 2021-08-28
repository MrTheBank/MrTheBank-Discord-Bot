const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { hasPermissions } = require('../../../utils/permissions');
const DB = require('../../../database/mongoose-handler');

module.exports = {
    name: 'setprefix',

    interaction: new SlashCommandBuilder()
        .setName('setprefix')
        .setDescription('Set server prefix')
        .addStringOption(option =>
            option.setName('prefix')
                .setDescription('Prefix')
                .setRequired(true)
        )
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        if (!hasPermissions(ctx, ['ADMINISTRATOR'])) {
            return ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ท่านไม่มี Permissions: `ADMINISTRATOR`')
            );
        }

        const arg = ctx.type === 'interaction' ? ctx.options.getString('setprefix') : ctx.args.join(' ');
        if (!arg) {
            return ctx.sendEmbed(new MessageEmbed()
                .setColor('BLUE')
                .setTitle('ตั้ง Prefix สำหรับเซิฟเวอร์ท่าน')
                .setDescription('การตั้ง Prefix มีเงื่อนไขดังนี้\n\n' +
                    '• ตัวอักษรไม่น้อยกว่า 1 และไม่มากกว่า 5\n' +
                    '• ไม่มีช่องว่าง (Space) ขึ้นหน้า'));
        }

        const length = arg.length;
        if (arg === '+') {
            await DB.default_prefix(ctx.action.guild.id);

            await ctx.client.prefixes.delete(ctx.action.guild.id);
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#00E000')
                .setDescription('เปลี่ยน Prefix ของเซิฟเวอร์นี้เป็น `'+arg+'`')
            );
        } else if (length >= 1 && length <= 5) {
            await DB.set_prefix(ctx.action.guild.id, arg);

            await ctx.client.prefixes.set(ctx.action.guild.id, arg);
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#00E000')
                .setDescription('เปลี่ยน Prefix ของเซิฟเวอร์นี้เป็น `'+arg+'`')
            );
        } else {
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ตัวอักษรต้องไม่น้อยกว่า 1 และไม่มากกว่า 5')
            );
        }
    }
}
