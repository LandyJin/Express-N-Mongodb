const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')

const productsRoutes = require('./routes/products')
const authRoutes = require('./routes/auth')

require('./database')

app.use(express.json())

app.use(cookieParser())
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  }))

app.get('/', (req, res) => {
    console.log("hello node api")
    return
})

app.use('/products', productsRoutes)
app.use('/auth', authRoutes)
app.listen("3000", () => console.log("test"))