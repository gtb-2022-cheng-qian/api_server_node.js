import getPromise from "../utils/promise.js"

const getUserInfoById = (id) => {
    return getPromise('select id, username, nickname, email, user_pic from ev_users where id=?', [id])
}

const updateUserInfoById = (userInfo, id) => {
    return getPromise('update ev_users set ? where id=?', [userInfo, id])
}

const getPasswordById = (id) => {
    return getPromise('select password from ev_users where id=?', [id])
}

const updatePasswordById = (newPwd, id) => {
    return getPromise('update ev_users set password=? where id=?', [newPwd, id])
}

const updateAvatarById = (avatar, id) => {
    return getPromise('update ev_users set user_pic=? where id=?', [avatar, id])
}

export default {
    getUserInfoById,
    updateUserInfoById,
    getPasswordById,
    updatePasswordById,
    updateAvatarById
}