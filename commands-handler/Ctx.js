module.exports = class Ctx {
    constructor(context = {}, type='') {
        this.type = type;
        this.client = context.client;

        if (type === 'message') {
            this.action = context.message;
            this.command = context.command;
            this.args = context.args
        }

        if (type === 'interaction') {
            this.action = context.interaction;
            this.commandName = context.interaction.commandName;
            this.options = context.interaction.options;
        }
    }

    async sendMSG(content, defer = false, ephemeral = false , options = {}) {
        if (this.type === 'interaction') {
            if (defer) {
                return this.action.editReply(content).then(() => {return this.action.fetchReply()});
            } else {
                return this.action.reply(content).then(() => {return this.action.fetchReply()});
            }
        } else {
            return this.action.channel.send(content, options).then(result => {return result});
        }
    }

    async sendEmbed(embed, defer = false, ephemeral = false, options = {}) {
        if (this.type === 'interaction') {
            let context = {content: ' ', ephemeral: ephemeral, embeds: [embed]};
            if (defer) await this.action.editReply(context); else await this.action.reply(context);
        } else {
            return this.action.channel.send({embeds: [embed]}, options).then(result => {return result});
        }
    }

    async sendFiles(files = [], ephemeral = false, options = {}) {
        if (this.type === 'interaction') {
            await this.action.reply({files: files});
        } else {
            await this.action.channel.send({files: files});
        }
    }

    async editEmbed(embed, ephemeral = false, options = {}, msg = {}) {
        if (this.type === 'interaction') {
            await this.action.editReply({content: ' ', ephemeral: ephemeral, embeds: [embed]});
        } else {
            await msg.edit({content: ' ', embeds: [embed]}, options);
        }
    }
}
