import service from '../service/userRegAndLog.js'

const register = (req, res) => {
    service.clientRegister(req)
        .then(() => res.status(201).send({message: 'register success'}))
        .catch(err => res.status(500).send({message: err}))
}

const login = (req, res) => {
    service.clientLogin(req)
        .then((tokenStr) => res.status(201).send({message: 'login success', token: 'Bearer ' + tokenStr,}))
        .catch(err => res.status(500).send({message: err}))
}

export default {
    register,
    login
}