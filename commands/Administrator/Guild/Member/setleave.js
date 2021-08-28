const { MessageEmbed } = require('discord.js');
const { hasPermissions, hasPermissionsIn } = require('../../../../utils/permissions');
const configBot = require('../../../../config/bot');
const DB = require('../../../../database/mongoose-handler');

module.exports = {
    name: 'setleave',

    interaction: false,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const prefix = ctx.client.prefixes.get(ctx.action.guild.id) || configBot.prefix;
        const filter = m => m.author.id === ctx.action.author.id;

        if (!hasPermissions(ctx, ['ADMINISTRATOR'])) {
            return ctx.sendEmbed(new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ท่านไม่มี Permissions: `ADMINISTRATOR`')
            );
        }

        const info = await DB.guildMemberMSG_get('leave_msg', ctx.action.guild.id);
        if (info) {
            // REMOVE CHANNEL
            if (ctx.args[0] === 'remove') {
                await DB.guildMemberMSG_remove('leave_msg', ctx.action.guild.id).then(() => {
                    return ctx.sendEmbed(
                        new MessageEmbed()
                            .setColor('#00E000')
                            .setDescription('ลบการตั้งค่าการส่งข้อความลาจากเรียบร้อย')
                    );
                });

            // EDIT CHANNEL
            } else if (ctx.args[0] === 'edit' && ctx.args[1] === 'channel') {
                await ctx.sendEmbed(
                    new MessageEmbed()
                        .setColor('BLUE')
                        .setDescription('กรุณาพิมพ์ชื่อช่อง\n' +
                            'ตัวอย่าง: `#discord`')
                ).then(async () => {
                    await ctx.action.channel.awaitMessages({filter, max: 1, time: 60000, errors: ['time']})
                        .then(async message => {
                            message = message.first();
                            let channel = message.mentions.channels.first();
                            if (channel) {
                                if (hasPermissionsIn(ctx, channel.id, ['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                                    DB.guildMemberMSG_edit('leave_msg', message.guild.id, 'channel_id', channel.id).then(() => {
                                        return ctx.sendEmbed(
                                            new MessageEmbed()
                                                .setColor('#00E000')
                                                .setDescription('เปลี่ยนช่องข้อความลาจากเป็น ' + channel.toString() + ' สำเร็จ')
                                        );
                                    });
                                } else {
                                    return ctx.sendEmbed(
                                        new MessageEmbed()
                                            .setColor('#E00000')
                                            .setTitle('ไม่สามารถส่งข้อความในช่อง `#' + channel.name + '`')
                                            .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave edit channel` ใหม่')
                                    );
                                }
                            } else {
                                return ctx.sendEmbed(new MessageEmbed()
                                    .setColor('#E00000')
                                    .setTitle('ชื่อช่องไม่ถูกต้อง')
                                    .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave edit channel` ใหม่')
                                );
                            }
                        }).catch(async collected => {
                            await ctx.sendEmbed(new MessageEmbed()
                                .setColor('#E00000')
                                .setTitle('[setleave] หมดเวลาในการเขียน')
                                .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave edit channel` ใหม่')
                            );
                        });
                });

                // EDIT MESSAGE
            } else if (ctx.args[0] === 'edit' && ctx.args[1] === 'message') {
                await ctx.sendEmbed(new MessageEmbed()
                    .setColor('BLUE')
                    .setDescription('กรุณาพิมพ์ข้อความลาจาก โดย `<discord_tag>` แทนชื่อแสดงของผู้ที่เข้ามา\n' +
                        'ตัวอย่าง: `ลาก่อนคุณ <discord_tag>`')
                ).then(async () => {
                    await ctx.action.channel.awaitMessages({filter, max: 1, time: 60000, errors: ['time']})
                        .then(async message => {
                            message = message.first();
                            DB.guildMemberMSG_edit('leave_msg', message.guild.id, 'message', message.content).then(() => {
                                return ctx.sendEmbed(
                                    new MessageEmbed()
                                        .setColor('#00E000')
                                        .setDescription('เปลี่ยนข้อความลาจากสำเร็จ')
                                );
                            });
                        }).catch(async collected => {
                            await ctx.sendEmbed(
                                new MessageEmbed()
                                    .setColor('#E00000')
                                    .setTitle('[setleave] หมดเวลาในการเขียน')
                                    .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave edit message` ใหม่')
                            );
                        });
                });


            } else {
                await ctx.sendEmbed(new MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('ตั้งค่าข้อความลาจาก')
                    .setDescription('`' + prefix + 'setleave edit channel` - เพื่อแก้ไขการส่งข้อความลาจากไปช่องอื่น\n' +
                        '`' + prefix + 'setleave edit message` - เพื่อแก้ไขข้อความลาจาก\n' +
                        '`' + prefix + 'setleave remove` - เพื่อลบการตั้งค่าการส่งข้อความลาจาก (จำเป็นต้องตั้งค่าใหม่ หากเปิดใช้งานอีกรอบ)')
                );
            }

            // CREATE NEW ONE
        } else {
            await ctx.sendEmbed(new MessageEmbed()
                .setColor('BLUE')
                .setDescription('กรุณาพิมพ์ชื่อช่อง\n' +
                    'ตัวอย่าง: `#discord`')
            ).then(async () => {
                let result, channel;
                await ctx.action.channel.awaitMessages({filter, max: 1, time: 60000, errors: ['time']})
                    .then(async message => {
                        message = message.first();
                        if (message.mentions.channels.first()) {
                            channel = message.mentions.channels.first();
                            if (hasPermissionsIn(ctx, channel.id, ['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
                                await ctx.sendEmbed(
                                    new MessageEmbed()
                                        .setColor('BLUE')
                                        .setDescription('กรุณาพิมพ์ข้อความลาจาก โดย `<discord_tag>` แทนชื่อแสดงของผู้ที่เข้ามา\n' +
                                            'ตัวอย่าง: `ลาก่อนคุณ <discord_tag>`')
                                );
                                result = true;
                            } else {
                                await ctx.sendEmbed(
                                    new MessageEmbed()
                                        .setColor('#E00000')
                                        .setTitle('ไม่สามารถส่งข้อความในช่อง `#' + channel.name + '`')
                                        .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave` ใหม่')
                                );
                                result = false;
                            }
                        } else {
                            await ctx.sendEmbed(
                                new MessageEmbed()
                                    .setColor('#E00000')
                                    .setTitle('ชื่อช่องไม่ถูกต้อง')
                                    .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave` ใหม่')
                            );
                            result = false;
                        }
                    }).catch(async collected => {
                        await ctx.sendEmbed(new MessageEmbed()
                            .setColor('#E00000')
                            .setTitle('[setleave] หมดเวลาในการเขียน')
                            .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave` ใหม่')
                        );
                        result = false;
                    })
                return [result, channel];
            }).then(async results => {
                if (results[0]) {
                    await ctx.action.channel.awaitMessages({filter, max: 1, time: 60000, errors: ['time']})
                        .then(async message => {
                            message = message.first();
                            DB.guildMemberMSG_create('leave_msg', message.guild.id, results[1].id, message.content).then(() => {
                                return ctx.sendEmbed(
                                    new MessageEmbed()
                                        .setColor('#00E000')
                                        .setDescription('ตั้งค่าข้อความลาจากสำเร็จ')
                                );
                            });
                        }).catch(async collected => {
                            await ctx.sendEmbed(new MessageEmbed()
                                .setColor('#E00000')
                                .setTitle('[setleave] หมดเวลาในการเขียน')
                                .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave` ใหม่')
                            );
                        });
                }
            });
        }
    }
}
