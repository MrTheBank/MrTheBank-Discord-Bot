module.exports = class Ctx {
    constructor(context = {}, type='') {
        this.type = type;

        if (type === 'message') {
            this.message = context.message;
            this.command = context.command;
            this.args = context.args
        }

        if (type === 'interaction') {
            this.interaction = context.interaction;
            this.commandName = context.interaction.commandName;
            this.options = context.interaction.options;
        }
    }

    async sendMSG(content, ephemeral = false , options = {}) {
        if (this.type === 'interaction') {
            await this.interaction.reply(content);
        } else {
            await this.message.channel.send(content, options);
        }
    }

    async sendEmbed(embed, ephemeral = false, options = {}) {
        if (this.type === 'interaction') {
            await this.interaction.reply({content: ' ', ephemeral: ephemeral, embeds: [embed]});
        } else {
            await this.message.channel.send({content: ' ', embeds: [embed]}, options);
        }
    }
}
