const db = require("../../../db/index.js");

function getPromise(username, sql, value) {
    return new Promise((resolve, reject) => {
        db.query(sql, value, (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    });
}

const getUserInfoByUsername = (username) => {
    return getPromise(username, 'select * from ev_users where username=?', [username])
}

const insertUser = (user) => {
    return getPromise(user, 'insert into ev_users set ?', [user])
}

module.exports = {
    insertUser,
    getUserInfoByUsername
}