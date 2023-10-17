const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport')
require('./strategies/local')

const productsRoutes = require('./routes/products')
const authRoutes = require('./routes/auth')

require('./database')

app.use(express.json())

app.use(cookieParser())
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://huiyanj91:12345@cluster0.bah5gef.mongodb.net/Node-API?retryWrites=true&w=majority'
    })
    // cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    console.log("hello node api")
    return
})

app.use('/products', productsRoutes)
app.use('/auth', authRoutes)
app.listen("3000", () => console.log("test"))