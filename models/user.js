const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter username']
        },
        password: {
            type: String,
            require: [true, 'Please enter password']
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        createAt: {
            type: Date,
            require: true,
            default: new Date()
        }
    }
)

const User = mongoose.model('Users', userSchema)

module.exports = User;