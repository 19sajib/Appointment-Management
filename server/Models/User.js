const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    }
}, { timestamps:true })

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel

