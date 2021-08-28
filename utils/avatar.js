function is_numeric(str) {
    if (typeof str != 'string') return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

module.exports = {
    isUser(ctx) {
        if (ctx.type === 'interaction') {
            return !!ctx.action.options.get('user');
        } else {
            let arg = ctx.args.join(' ');
            return arg && ctx.action.mentions.users.size;
        }
    },
    isSnowflake(ctx) {
        if (ctx.type === 'interaction') {
            return !!ctx.action.options.get('snowflake');
        } else {
            let arg = ctx.args.join(' ');
            return is_numeric(arg) && arg.length === 18;
        }
    },
    isName(ctx) {
        if (ctx.type === 'interaction') {
            return !!ctx.action.options.get('name');
        } else {
            let arg = ctx.args.join(' ');
            return arg && arg.length >= 3;
        }
    },
    async findUser(ctx) {
        let result;
        if (ctx.type === 'interaction') {
            result = ctx.action.options.getUser('user');
        } else {
            result = ctx.action.mentions.users.first();
        }

        return result;
    },
    async findSnowflake(ctx) {
        let value;
        if (ctx.type === 'interaction') {
            value = ctx.action.options.getString('snowflake');
        } else {
            value = ctx.args.join(' ');
        }
        await ctx.action.guild.members.fetch();
        let info = ctx.action.guild.members.cache.find(user => user.user.id === value);

        return info ? info.user : null;
    },
    async findName(ctx) {
        let value;
        if (ctx.type === 'interaction') {
            value = ctx.action.options.getString('name');
        } else {
            value = ctx.args.join(' ');
        }

        await ctx.action.guild.members.fetch();
        let info = ctx.action.guild.members.cache.find((user) => {
            if (user.nickname) {
                return user.nickname.toLowerCase().includes(value.toLowerCase()) || user.user.username.toLowerCase().includes(value.toLowerCase());
            } else {
                return user.user.username.toLowerCase().includes(value.toLowerCase());
            }
        });

        return info ? info.user : null;
    }
}
