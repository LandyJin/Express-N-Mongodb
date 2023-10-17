const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../models/user')
const { comparepassword } = require('../utils/helpers')

passport.serializeUser((user, done) => {
    console.log('Serialiaze User ', user)
    done(null, user.id)
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

passport.use(
    new Strategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        console.log(email, password)
        try {
            if (!email || !password) throw new Error('Bad Request, missing credentials')

            const userDB = await User.findOne({ email })
            if (!userDB) throw new Error('User not found')

            const isValid = comparepassword(password, userDB.password)
            if (isValid) {
                // Auth Success
                console.log('auth succress')
                done(null, userDB)
            } else {
                // Fail to Auth
                done(null, null)
                console.log('auth fail')
            }
        } catch (err){
            done(err, null)
        }
    })
)