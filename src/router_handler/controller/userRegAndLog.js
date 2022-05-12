const service = require('../service/userRegAndLog.js')

exports.register = (req, res) => {
    service.clientRegister(req)
        .then((results) => {
            if (results.affectedRows === 1) {
                res.send({
                    status: 0,
                    message: 'register success'
                })
            }
        })
        .catch(err => res.cc(err))
}

exports.login = (req, res) => {
    service.clientLogin(req)
        .then((tokenStr) => {
            res.send({
                status: 0,
                message: 'login success',
                // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
                token: 'Bearer ' + tokenStr,
            })
        })
        .catch(err => res.cc(err))
}