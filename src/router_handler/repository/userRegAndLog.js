const {getPromise} = require('../utils/promise.js');

const getUserInfoByUsername = (username) => {
    return getPromise('select * from ev_users where username=?', [username])
}

const insertUser = (user) => {
    return getPromise('insert into ev_users set ?', [user])
}

module.exports = {
    insertUser,
    getUserInfoByUsername
}