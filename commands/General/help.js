const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const arg = args.join(' ');

    const prefix = client.prefixes.get(message.guild.id) || process.env.DISCORD_PREFIX;

    if (!arg) {
        return message.channel.send(
            new MessageEmbed()
                .setTitle('<a:mrthebank_question:860447108145741824> คำสั่งทั้งหมด')
                .setColor('#00FFFF')
                .setDescription('บอทนี้ยังเป็นบอทที่อยู่ระหว่างการพัฒนา หากพบเจอปัญหาของบอทนี้ สามารถติดต่อผู้พัฒนาบอทได้ที่ `MrTheBank#5265`')
                .addFields(
                    { name: ':information_source: ทั่วไป', value: '`'+prefix+'help general`', inline: true },
                    { name: '<a:pepe_spin:860508557359317031> มีม', value: '`'+prefix+'help meme`', inline: true },
                    { name: '<a:popcat:860509614629322783> สัตว์', value: '`'+prefix+'help animal`', inline: true },
                    { name: '<a:gear_spinning:861495263729025024> แอดมิน', value: '`'+prefix+'help admin`', inline: true },
                    { name: '<a:gameboy:860522412121522216> Discord Together', value: '`'+prefix+'help together`', inline: true },
                )
                .setFooter(message.author.tag, message.author.displayAvatarURL({format:'png',size:32}))
                .setTimestamp()
        );
    }

    if (arg === 'general') {
        return message.channel.send(
            new MessageEmbed()
                .setTitle(':information_source: คำสั่งทั่วไป')
                .setColor('#6C00FF')
                .setDescription('\u200B\n' +
                    '`'+prefix+'avatar <ชื่อ/Discord UID (ไม่จำเป็น)>` - แสดงรูปโปรไฟล์\n' +
                    '`'+prefix+'botinfo` - แสดงข้อมูลของบอท\n' +
                    '`'+prefix+'discord` - แสดงลิงค์เข้า MrTheBank\'s Official Discord\n' +
                    '`'+prefix+'invite` - แสดงลิงค์เชิญบอทเข้าเซิฟเวอร์\n' +
                    '`'+prefix+'ping` - แสดงความล่าช้า\n' +
                    '`'+prefix+'prefix` - แสดง Prefix ของเซิฟเวอร์นี้\n' +
                    '`'+prefix+'together <ชนิด>` - เปิดห้อง Discord Together\n')
                .setFooter(message.author.tag, message.author.displayAvatarURL({format:'png',size:32}))
                .setTimestamp()
        );
    } else if (arg === 'meme') {
        return message.channel.send(
            new MessageEmbed()
                .setTitle('<a:pepe_spin:860508557359317031> คำสั่งมีม')
                .setColor('#6C00FF')
                .setDescription('\u200B\n' +
                    '`'+prefix+'ohs <ข้อความที่ 1>|<ข้อความที่ 2>` - สร้างมีม Office Handshake\n' +
                    '`'+prefix+'grml <ข้อความ>` - สร้างมีม กูรู้หมดแล้ว\n')
                .setFooter(message.author.tag, message.author.displayAvatarURL({format:'png',size:32}))
                .setTimestamp()
        );
    } else if (arg === 'animal') {
        return message.channel.send(
            new MessageEmbed()
                .setTitle('<a:popcat:860509614629322783> คำสั่งสัตว์')
                .setColor('#6C00FF')
                .setDescription('\u200B\n' +
                    '`' + prefix + 'cat` - สุ่มรูปแมว\n' +
                    '`' + prefix + 'dog <สายพันธ์ุ (ไม่จำเป็น)>` - สุ่มรูปสุนัข\n')
                .setFooter(message.author.tag, message.author.displayAvatarURL({format: 'png', size: 32}))
                .setTimestamp()
        );
    } else if (arg === 'admin') {
        return message.channel.send(
            new MessageEmbed()
                .setTitle('<a:gear_spinning:861495263729025024> คำสั่งแอดมิน')
                .setColor('#6C00FF')
                .setDescription('\u200B\n' +
                    '`' + prefix + 'setprefix <Prefix>` - ตั้งค่า Prefix ของเซิฟเวอร์\n' +
                    '`' + prefix + 'setwelcome` - ตั้งค่าข้อความต้อนรับของเซิฟเวอร์\n' +
                    '`' + prefix + 'setleave` - ตั้งค่าข้อความลาก่อนของเซิฟเวอร์')
                .setFooter(message.author.tag, message.author.displayAvatarURL({format: 'png', size: 32}))
                .setTimestamp()
        );
    } else if (arg === 'together') {
        return message.channel.send(
            new MessageEmbed()
                .setTitle('<a:gameboy:860522412121522216> คำสั่ง Discord Together')
                .setColor('#6C00FF')
                .setDescription('\u200B\n' +
                    '`'+prefix+'together youtube` - เปิดห้อง YouTube\n' +
                    '`'+prefix+'together poker` - เปิดห้อง Poker\n' +
                    '`'+prefix+'together chess` - เปิดห้อง Chess\n' +
                    '`'+prefix+'together betrayal` - เปิดห้อง Betrayal\n' +
                    '`'+prefix+'together fishing` - เปิดห้อง Fishing\n')
                .setFooter(message.author.tag, message.author.displayAvatarURL({format:'png',size:32}))
                .setTimestamp()
        );
    }
};