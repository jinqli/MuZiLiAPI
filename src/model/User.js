// 规范数据结构 Schema

const mongoose = require('../db/db')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    permissions: {
        type: Number,
        default: 0 // 0=管理员 1=游客 由于是个人网站 不考虑他人注册 只考虑他人评论和留言
    },
    verify: {
        type: String, // 值为false 权限=1 值为true 则权限=0
    },
    age: Number,
    city: String,
    gender: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', UserSchema)

module.exports = User