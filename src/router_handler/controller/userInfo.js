const service = require('../service/userInfo.js');

exports.getUserInfo = (req, res) => {
    service.getBasicUserInfo(req)
        .then(result => res.status(200).send({message: 'get user information success', data: result}))
        .catch(err => res.status(500).send({message: err}))
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    service.updateBasicUserInfo(req)
        .then(() => res.status(201).send({message: 'update user information success'}))
        .catch(err => res.status(500).send({message: err}))
}

// 重置密码的处理函数
exports.updatePwd = (req, res) => {
    service.resetPassword(req)
        .then(() => res.status(201).send({message: 'reset password success'}))
        .catch(err => res.status(500).send({message: err}))
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    service.resetAvatar(req)
        .then(() => res.status(201).send({message: 'reset avatar success'}))
        .catch(err => res.status(500).send({message: err}))
}