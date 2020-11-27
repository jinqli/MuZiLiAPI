// 操作数据库 users
const User = require('../model/User')

// 注册
async function register(userInfo = {}) {
    //插入数据库
    const newUser = await User.create(userInfo)
    // 返回用户注册的信息
    return newUser
}

// login
async function login(username, password) {
    // 查询数据库
    const result = await User.findOne({username, password})
    if (result !== null) {
        //存在数据
        return true
    }
    // 没有数据
    return false
}

// update user info
async function update(updateUser = {}, username) {
    // findOneAndUpdate
    const result = await User.findOneAndUpdate(
        {username},
        updateUser,
        {new:true}
    )
    return result
}

// 获取数据
async function getInfo() {
    // 获取所有数据
    const users = User.find()
    if (users !== null) {
        return users
    }
    return false
}

module.exports = {
    register,
    login,
    update,
    getInfo
}