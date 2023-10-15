const { Router } = require('express');
const User = require('../models/user')

const router = Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        if (req.session.user) {
            res.send(req.session.user)
            // console.log(req.session)
        } else {
            req.session.user = {
                username
            }
            res.send(req.session)
            // console.log(req.session.username)
        }
    } else res.send(401)
})

router.post('/', async(req, res) => {
    const { username, password, email } = req.body
    const userDB = await User.findOne({ $or: [{ username }, { email }]})
    if (userDB) {
        res.status(400).json({message: 'User exist'})
    } else {
        const user = await User.create({ username, password, email })
        res.status(200).json(user)    
    }
})

module.exports = router