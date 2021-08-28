module.exports = {
    // Required intents for bot. (https://discord.com/developers/docs/topics/gateway#gateway-intents)
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILD_VOICE_STATES'
    ],

    // Default prefix for bot.
    prefix: '+',

    // New guild or removed guild event and send event log to text channel.
    guild_events_channel_id: '859356478582030357'
}
