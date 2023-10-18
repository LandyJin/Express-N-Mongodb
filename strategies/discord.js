const passport = require('passport')
const { Strategy } = require('passport-discord')
const DiscordUser = require('../models/discordUser')
require('dotenv').config()

passport.serializeUser((user, done) => {
    console.log('Serialiaze User ', user)
    done(null, user.discordId)
})

passport.deserializeUser(async(id, done) => {
    console.log('Deserialize user', id)
    try {
        const user = await User.findById(id)
        console.log(user)
        if(!user) throw new Error('User not found')
        done(null, user)
    } catch (err) {
        console.log(err)
        done(err, null)
    }
})

passport.use(new Strategy({
    // clientID: process.env.CLIENT_ID,
    // clientSecret: process.env.CLIENT_SECRET,
    clientID: '1163708069319032862',
    clientSecret: '-u9sE-nBzW8UbUm610bFFNjg4qEBHwx3',
    callbackURL: 'http://localhost:3000/auth/discord/redirect',
    scope: ['identify'],
}, async(accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile)
    try {
        const discordUser = await DiscordUser.findOne({ discordId: profile.id })
        if (discordUser) {
            console.log('Find user')
            return done(null, discordUser)
        } else {
            const newUser = await DiscordUser.create({
                discordId: profile.id 
            })
            console.log('Create user')
            return done(null, newUser)
        }
    } catch (err) {
        console.log(err)
        return done(err, null)
    }
}))