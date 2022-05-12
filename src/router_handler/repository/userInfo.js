const db = require("../../../db/index.js");

const getUserInfoById = (id) => {
    return new Promise((resolve, reject) => {
        // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
        db.query('select id, username, nickname, email, user_pic from ev_users where id=?', [id], (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

const updateUserInfoById = (userInfo, id) => {
    return new Promise((resolve, reject) => {
        db.query('update ev_users set ? where id=?', [userInfo, id], (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

const getPasswordById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('select password from ev_users where id=?', [id], (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

const updatePasswordById = (newPwd, id) => {
    return new Promise((resolve, reject) => {
        db.query('update ev_users set password=? where id=?', [newPwd, id], (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

const updateAvatarById = (avatar, id) => {
    return new Promise((resolve, reject) => {
        db.query('update ev_users set user_pic=? where id=?', [avatar, id], (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

module.exports = {
    getUserInfoById,
    updateUserInfoById,
    getPasswordById,
    updatePasswordById,
    updateAvatarById
}