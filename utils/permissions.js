const { Permissions } = require('discord.js');

module.exports = {
    hasPermissions(ctx, permissions=[]) {
        permissions = permissions.map(value => Permissions.FLAGS[value]);
        return ctx.action.member.permissions.has(permissions);
    },

    hasPermissionsIn(ctx, channel, permissions=[]) {
        permissions = permissions.map(value => Permissions.FLAGS[value]);
        return ctx.action.guild.me.permissionsIn(channel).has(permissions);
    }
}
