const service = require('../service/userInfo.js');

exports.getUserInfo = (req, res) => {
    service.getBasicUserInfo(req)
        .then(result => {
            res.send({
                status: 0,
                message: 'get user information success',
                data: result
            })
        })
        .catch(err => res.cc(err))
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    service.updateBasicUserInfo(req)
        .then(() => {
            res.send({
                status: 0,
                message: 'updating succeed'
            })
        })
        .catch(err => res.cc(err))
}

// 重置密码的处理函数
exports.updatePwd = (req, res) => {
    service.resetPassword(req)
        .then(() => {
            res.send({
                status: 0,
                message: 'resetting succeed'
            })
        })
        .catch(err => res.cc(err))
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    service.resetAvatar(req)
        .then(() => {
            res.send({
                status: 0,
                message: 'updating avatar succeed'
            })
        })
        .catch(err => res.cc(err))
}