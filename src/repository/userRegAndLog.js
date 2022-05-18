import promisify from "../utils/promise.js"

const getUserInfoByUsername = (username) => {
    return promisify('select * from ev_users where username=?', [username])
}

const insertUser = (user) => {
    return promisify('insert into ev_users set ?', [user])
}

export default {
    getUserInfoByUsername,
    insertUser
}