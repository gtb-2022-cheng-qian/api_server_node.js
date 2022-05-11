// 导入数据库模块
const db = require('../../../db')
// 导入加密模块
const bcrypt = require('bcryptjs')
const userInfo = require('../repository/userInfo.js')

// 获取用户基本信息的处理函数
exports.getUserInfo = async (req, res) => {
    const result = await userInfo.getBasicUserInfo(req, res)

    res.send({
        status: 0,
        message: 'get user information success',
        data: result
    })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    userInfo.updateUserInfoById(req, res)
    res.send({
        status: 0,
        message: 'updating succeed'
    })
}

// 重置密码的处理函数
exports.updatePwd = async (req, res) => {
    const result = await userInfo.getPassword(req, res)

    // 校验旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, result.password)
    if (!compareResult) return res.cc('old password error')

    // 更新密码
    req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    userInfo.updatePassword(req, res)
    res.send({
        status: 0,
        message: 'resetting succeed'
    })
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    db.query('update ev_users set user_pic=? where id=?', [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('update avatar error')
        res.send({
            status: 0,
            message: 'updating avatar succeed'
        })
    })
}