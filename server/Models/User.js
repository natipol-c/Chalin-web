const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
{
    email: String,
    password: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
    picture: String,
    displayName: String,
    ip:String,
    name:String,
    orderCount: { 
        type: Number,
        default: 0
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('user', userSchema)