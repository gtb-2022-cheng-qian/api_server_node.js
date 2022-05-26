import service from '../service/userInfo.js'

const getUserInfo = (req, res) => {
    return service.getBasicUserInfo(req)
        .then(result => res.status(200).send({message: 'get user information success', data: result}))
}

// 更新用户基本信息的处理函数
const updateUserInfo = (req, res) => {
    return service.updateBasicUserInfo(req)
        .then(() => res.status(201).send({message: 'update user information success'}))
}

// 重置密码的处理函数
const updatePwd = (req, res) => {
    return service.resetPassword(req)
        .then(() => res.status(201).send({message: 'reset password success'}))
}

// 更新用户头像的处理函数
const updateAvatar = (req, res) => {
    return service.resetAvatar(req)
        .then(() => res.status(201).send({message: 'reset avatar success'}))
}

export default {
    getUserInfo,
    updateUserInfo,
    updatePwd,
    updateAvatar
}