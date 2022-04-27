// 导入数据库模块
const db = require('../db/index.js');

// 导入加密模块
const bcrypt = require('bcryptjs');

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query('SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id=?', [req.user.id], (err, results) => {
        if (err) return res.cc('sql error');
        if (results.length !== 1) return res.cc('query error');
        res.send({
            status: 0,
            data: results[0]
        })
    })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    db.query('update ev_users set ? where id=?', [req.body, req.body.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('update user info error')
        res.send({
            status: 0,
            msg: 'updating succeed'
        })
    })
}

// 重置密码的处理函数
exports.updatePwd = (req, res) => {
    db.query('select * from ev_users where id=?', [req.user.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.length !== 1) return res.cc('query error')
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('old password error')
    })
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    db.query('update ev_users set password=? where id=?', [newPwd, req.user.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('update error')
        res.send({
            status: 0,
            msg: 'resetting succeed'
        })
    })
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    db.query('update ev_users set user_pic=? where id=?', [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('update avatar error')
        res.send({
            status: 0,
            msg: 'updating avatar succeed'
        })
    })
}