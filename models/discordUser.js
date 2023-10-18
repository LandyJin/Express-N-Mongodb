const mongoose = require('mongoose')

const discordUserSchema = mongoose.Schema(
    {
        discordId: {
            type: String,
            require: true
        },
        createAt: {
            type: Date,
            require: true,
            default: new Date()
        }
    }
)

const DiscordUser = mongoose.model('discord_users', discordUserSchema)

module.exports = DiscordUser;