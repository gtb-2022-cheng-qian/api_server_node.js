import promisify from "../utils/promise.js"

const getUserInfoById = (id) => {
    return promisify('select id, username, nickname, email, user_pic from ev_users where id=?', [id])
}

const updateUserInfoById = (userInfo, id) => {
    return promisify('update ev_users set ? where id=?', [userInfo, id])
}

const getPasswordById = (id) => {
    return promisify('select password from ev_users where id=?', [id])
}

const updatePasswordById = (newPwd, id) => {
    return promisify('update ev_users set password=? where id=?', [newPwd, id])
}

const updateAvatarById = (avatar, id) => {
    return promisify('update ev_users set user_pic=? where id=?', [avatar, id])
}

export default {
    getUserInfoById,
    updateUserInfoById,
    getPasswordById,
    updatePasswordById,
    updateAvatarById
}