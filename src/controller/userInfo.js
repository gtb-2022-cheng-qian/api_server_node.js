import service from '../service/userInfo.js'

const getUserInfo = (req, res) => {
    service.getBasicUserInfo(req)
        .then(result => res.status(200).send({message: 'get user information success', data: result}))
        .catch(err => res.status(500).send({message: err}))
}

// 更新用户基本信息的处理函数
const updateUserInfo = (req, res) => {
    service.updateBasicUserInfo(req)
        .then(() => res.status(201).send({message: 'update user information success'}))
        .catch(err => res.status(500).send({message: err}))
}

// 重置密码的处理函数
const updatePwd = (req, res) => {
    service.resetPassword(req)
        .then(() => res.status(201).send({message: 'reset password success'}))
        .catch(err => res.status(500).send({message: err}))
}

// 更新用户头像的处理函数
const updateAvatar = (req, res) => {
    service.resetAvatar(req)
        .then(() => res.status(201).send({message: 'reset avatar success'}))
        .catch(err => res.status(500).send({message: err}))
}

export default {
    getUserInfo,
    updateUserInfo,
    updatePwd,
    updateAvatar
}