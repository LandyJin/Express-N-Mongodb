const { Router } = require('express');
const User = require('../models/user')
const { hashpassword, comparepassword } = require('../utils/helpers')

const router = Router();

router.post('/login', async(req, res) => {
    const { email, password } = req.body
    const userDB = await User.findOne({ email })
    if (userDB && password) {
        if (req.session.user) {
            res.send(req.session.user)
            // console.log(req.session)
        } else {
            const isValid = comparepassword(password, userDB.password)
            if (isValid) {
                // Auth Success
                req.session.user = {
                    userDB
                }
                res.send(req.session)
            } else {
                // Fail to Auth
                res.send(401)
            }
        }
    } else res.send(401)
})

router.post('/register', async(req, res) => {
    const { email } = req.body
    const userDB = await User.findOne({ email })
    if (userDB) {
        res.status(400).json({message: 'User exist'})
    } else {
        const password = hashpassword(req.body.password)
        console.log(password)
        const user = await User.create({ username, password, email })
        res.status(200).json(user)    
    }
})

module.exports = router