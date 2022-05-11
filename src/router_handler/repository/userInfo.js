const db = require("../../../db/index.js");

exports.getBasicUserInfo = (req, res) => {
    return new Promise((resolve) => {
        // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
        db.query('select id, username, nickname, email, user_pic from ev_users where id=?', [req.user.id], (err, results) => {
            if (err) return res.cc('sql error');
            if (results.length !== 1) return res.cc('query error');
            resolve(results[0]);
        })
    })
}

exports.updateUserInfoById = (req, res) => {
    db.query('update ev_users set ? where id=?', [req.body, req.user.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('update user info error')
    })
}

exports.getPassword = (req, res) => {
    return new Promise((resolve) => {
        db.query('select password from ev_users where id=?', [req.user.id], (err, results) => {
            if (err) return res.cc('sql error');
            if (results.length !== 1) return res.cc('password query error');
            resolve(results[0]);
        })
    })
}

exports.updatePassword = (req, res) => {
    db.query('update ev_users set password=? where id=?', [req.body.newPwd, req.user.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('update password error')
    })
}

exports.updateAvatar = (req, res) => {
    db.query('update ev_users set user_pic=? where id=?', [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('update avatar error')
    })
}