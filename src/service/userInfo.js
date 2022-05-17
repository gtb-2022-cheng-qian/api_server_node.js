// 导入加密模块
import bcrypt from "bcryptjs"
import repo from "../repository/userInfo.js"

// 获取用户基本信息的处理函数
const getBasicUserInfo = (req) => {
    return new Promise((resolve, reject) => {
        repo.getUserInfoById(req.user.id)
            .then(results => {
                if (results.length !== 1) return reject('query error')
                resolve(results[0]);
            })
            .catch(err => reject(err))
    })
}

// 更新用户基本信息的处理函数
const updateBasicUserInfo = (req) => {
    return new Promise((resolve, reject) => {
        repo.updateUserInfoById(req.body, req.user.id)
            .then(results => {
                if (results.affectedRows !== 1) return reject('update user info error')
                resolve(results);
            })
            .catch(err => reject(err))
    })
}

// 重置密码的处理函数
const resetPassword = (req) => {
    return new Promise((resolve, reject) => {
        repo.getPasswordById(req.user.id)
            .then(results => {
                if (results.length !== 1) return reject('password query error');
                // 校验旧密码是否正确
                const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
                if (!compareResult) return reject('old password error')
            })
            .catch(err => reject(err))

        // 更新密码
        req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        repo.updatePasswordById(req.body.newPwd, req.user.id)
            .then(results => {
                if (results.affectedRows !== 1) return reject('update password error')
                resolve(results);
            })
            .catch(err => reject(err))

    })
}

// 更新用户头像的处理函数
const resetAvatar = (req) => {
    return new Promise((resolve, reject) => {
        repo.updateAvatarById(req.body.avatar, req.user.id)
            .then(results => {
                if (results.affectedRows !== 1) return reject('update avatar error')
                resolve(results);
            })
            .catch(err => reject(err))
    })
}

export default {
    getBasicUserInfo,
    updateBasicUserInfo,
    resetPassword,
    resetAvatar
}