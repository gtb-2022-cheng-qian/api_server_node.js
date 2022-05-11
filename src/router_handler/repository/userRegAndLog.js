const db = require("../../../db/index.js");

exports.checkUsername = (req, res) => {
    db.query('select * from ev_users where username=?', [req.body.username], (err, results) => {
        // 如果查询出错，则返回错误信息
        if (err) return res.cc('sql error')
        // 如果查询结果不为空，则说明用户名已被占用
        if (results.length > 0) return res.cc('username is already used')
        // 如果查询结果为空，说明用户名可用，则对密码进行加密处理
    })
}

exports.addUser = (req, res) => {
    db.query('insert into ev_users set ?', [req.body], (err, results) => {
        // 如果插入出错，则返回错误信息
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('insert error')
    })
}

exports.getUserInfoByUsername = (req, res) => {
    return new Promise((resolve, reject) => {
        db.query('select * from ev_users where username=?', [req.body.username], (err, results) => {
            if (err) return res.cc('sql error')
            if (results.length !== 1) return res.cc('username error')
            resolve(results[0])
        })
    })
}