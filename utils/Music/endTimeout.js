const { leave_on_end } = require("../../config/bot");
const {MessageEmbed} = require("discord.js");

module.exports = class EndTimeout {
    constructor() {
        this.timeouts = new Map();
    }

    setTimeout(queue) {
        let timeout = setTimeout(async () => {
            queue.connection.disconnect();
            queue.destroy(true);
            await queue.metadata.send({embeds: [new MessageEmbed()
                    .setColor('#ffff66')
                    .setDescription('เนื่องจากไม่มีความเคลื่อนไหว บอทจึงออกจากห้อง')]
            });
        }, leave_on_end * 1000);
        this.timeouts.set(queue.guild.id, timeout);
    }

    clearTimeout(queue) {
        let timeout = this.timeouts.get(queue.guild.id);
        if (timeout) {
            clearTimeout(timeout);
            this.timeouts.delete(queue.guild.id);
        }
    }
}