const { MessageEmbed } = require('discord.js');
const DB = require('../../utils/database.js');

exports.run = async (client, message, args) => {
    // Constant
    const prefix = client.prefixes.get(message.guild.id) || process.env.DISCORD_PREFIX;
    const filter = m => m.author.id === message.author.id;

    // Check if user has ADMINISTRATOR permission.
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(
            new MessageEmbed()
                .setColor('#E00000')
                .setDescription('ท่านไม่มี Permission: `ADMINISTRATOR`')
        );
    }

    const info = await DB.guildMemberMSG_get('leave_msg', message.guild.id);

    if (info) {
        if (args[0] === 'remove') {
            DB.guildMemberMSG_remove('leave_msg', message.guild.id).then(() => {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor('#00E000')
                        .setDescription('ลบการตั้งค่าการส่งข้อความลาจากเรียบร้อย')
                );
            });
            // EDIT CHANNEL
        } else if (args[0] === 'edit' && args[1] === 'channel') {
            await message.channel.send(
                new MessageEmbed()
                    .setColor('BLUE')
                    .setDescription('กรุณาพิมพ์ชื่อช่อง\n' +
                        'ตัวอย่าง: `#discord`')
            ).then(async () => {
                await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async message => {
                    message = message.first();
                    let channel = message.mentions.channels.first();
                    if (channel) {
                        if (message.guild.me.permissionsIn(channel.id).has('SEND_MESSAGES') && message.guild.me.permissionsIn(channel.id).has('VIEW_CHANNEL')) {
                            DB.guildMemberMSG_edit('leave_msg', message.guild.id, 'channel_id', channel.id).then(() => {
                                return message.channel.send(
                                    new MessageEmbed()
                                        .setColor('#00E000')
                                        .setDescription('เปลี่ยนช่องข้อความลาจากเป็น ' + channel.toString() + ' สำเร็จ')
                                );
                            });
                        } else {
                            return message.channel.send(
                                new MessageEmbed()
                                    .setColor('#E00000')
                                    .setTitle('ไม่สามารถส่งข้อความในช่อง `#' + channel.name + '`')
                                    .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave edit channel` ใหม่')
                            );
                        }
                    } else {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor('#E00000')
                                .setTitle('ชื่อช่องไม่ถูกต้อง')
                                .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave edit channel` ใหม่')
                        );
                    }
                }).catch(async collected => {
                    await message.channel.send(
                        new MessageEmbed()
                            .setColor('#E00000')
                            .setTitle('[setleave] หมดเวลาในการเขียน')
                            .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave edit channel` ใหม่')
                    );
                });
            });
            // END OF EDIT CHANNEL

            // EDIT MESSAGE
        } else if (args[0] === 'edit' && args[1] === 'message') {
            await message.channel.send(
                new MessageEmbed()
                    .setColor('BLUE')
                    .setDescription('กรุณาพิมพ์ข้อความลาจาก โดย `<discord_tag>` แทนชื่อแสดงของผู้ที่เข้ามา\n' +
                        'ตัวอย่าง: `ลาก่อนคุณ <discord_tag>`')
            ).then(async () => {
                await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async message => {
                    message = message.first();
                    DB.guildMemberMSG_edit('leave_msg', message.guild.id, 'message', message.content).then(() => {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor('#00E000')
                                .setDescription('เปลี่ยนข้อความลาจากสำเร็จ')
                        );
                    })
                }).catch(async collected => {
                    await message.channel.send(
                        new MessageEmbed()
                            .setColor('#E00000')
                            .setTitle('[setleave] หมดเวลาในการเขียน')
                            .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave edit message` ใหม่')
                    );
                });
            });
            // END OF EDIT MESSAGE
        } else {
            return message.channel.send(
                new MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('ตั้งค่าข้อความลาจาก')
                    .setDescription('`' + prefix + 'setleave edit channel` - เพื่อแก้ไขการส่งข้อความลาจากไปช่องอื่น\n' +
                        '`' + prefix + 'setleave edit message` - เพื่อแก้ไขข้อความลาจาก\n' +
                        '`' + prefix + 'setleave remove` - เพื่อลบการตั้งค่าการส่งข้อความลาจาก (จำเป็นต้องตั้งค่าใหม่ หากเปิดใช้งานอีกรอบ)')
            )
        }
    } else {
        await message.channel.send(
            new MessageEmbed()
                .setColor('BLUE')
                .setDescription('กรุณาพิมพ์ชื่อช่อง\n' +
                    'ตัวอย่าง: `#discord`')
        ).then(async () => {
            let result, channel;
            await message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(async message => {
                message = message.first();
                if (message.mentions.channels.first()) {
                    channel = message.mentions.channels.first();
                    if (message.guild.me.permissionsIn(channel.id).has('SEND_MESSAGES') && message.guild.me.permissionsIn(channel.id).has('VIEW_CHANNEL')) {
                        await message.channel.send(
                            new MessageEmbed()
                                .setColor('BLUE')
                                .setDescription('กรุณาพิมพ์ข้อความต้อนรับ โดย `<discord_tag>` แทนชื่อแสดงของผู้ที่เข้ามา\n' +
                                    'ตัวอย่าง: `ลาก่อนคุณ <discord_tag>`')
                        );
                        result = true;
                    } else {
                        await message.channel.send(
                            new MessageEmbed()
                                .setColor('#E00000')
                                .setTitle('ไม่สามารถส่งข้อความในช่อง `#' + channel.name + '`')
                                .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave` ใหม่')
                        );
                        result = false;
                    }
                } else {
                    await message.channel.send(
                        new MessageEmbed()
                            .setColor('#E00000')
                            .setTitle('ชื่อช่องไม่ถูกต้อง')
                            .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave` ใหม่')
                    );
                    result = false;
                }
            }).catch(async collected => {
                await message.channel.send(
                    new MessageEmbed()
                        .setColor('#E00000')
                        .setTitle('[setleave] หมดเวลาในการเขียน')
                        .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave` ใหม่')
                );
                result = false;
            });
            return [result, channel];
        }).then(async results => {
            if (results[0]) {
                await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async message => {
                    message = message.first();
                    DB.guildMemberMSG_create('leave_msg', message.guild.id, results[1].id, message.content).then(() => {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor('#00E000')
                                .setDescription('ตั้งค่าข้อความลาจากสำเร็จ')
                        );
                    });
                }).catch(async collected => {
                    await message.channel.send(
                        new MessageEmbed()
                            .setColor('#E00000')
                            .setTitle('[setleave] หมดเวลาในการเขียน')
                            .setDescription('กรุณาลองใหม่โดยการพิมพ์คำสั่ง `' + prefix + 'setleave` ใหม่')
                    );
                });
            }
        });
    }
}
