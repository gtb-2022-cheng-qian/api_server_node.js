// 导入加密模块
import bcrypt from "bcryptjs"
import repo from "../repository/userInfo.js"
import {BadRequestError, ConflictError, NotFoundError} from "../exception/ApplicationError.js"

// 获取用户基本信息的处理函数
const getBasicUserInfo = (req) => {
    return repo.getUserInfoById(req.user.id)
        .then(results => {
            if (results.length !== 1) throw new BadRequestError('query error')
            return results[0]
        })
}

// 更新用户基本信息的处理函数
const updateBasicUserInfo = (req) => {
    return repo.updateUserInfoById(req.body, req.user.id)
        .then(results => {
            if (results.affectedRows !== 1) throw new BadRequestError('update user info error')
            return results
        })
}

// 重置密码的处理函数
const resetPassword = (req) => {
    return repo.getPasswordById(req.user.id)
        .then(results => {
            if (results.length !== 1) throw new NotFoundError('password query error')
            // 校验旧密码是否正确
            const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
            if (!compareResult) throw new ConflictError('old password error')
            // 更新密码
            req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
            return repo.updatePasswordById(req.body.newPwd, req.user.id)
                .then(results => {
                    if (results.affectedRows !== 1) throw new BadRequestError('update password error')
                    return results
                })
        })
}

// 更新用户头像的处理函数
const resetAvatar = (req) => {
    return repo.updateAvatarById(req.body.avatar, req.user.id)
        .then(results => {
            if (results.affectedRows !== 1) throw new BadRequestError('update avatar error')
            return results
        })
}

export default {
    getBasicUserInfo,
    updateBasicUserInfo,
    resetPassword,
    resetAvatar
}