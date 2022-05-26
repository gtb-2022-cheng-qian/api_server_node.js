import service from '../service/userRegAndLog.js'

const register = (req, res) => {
    return service.clientRegister(req)
        .then(() => res.status(201).send({message: 'register success'}))
}

const login = (req, res) => {
    return service.clientLogin(req)
        .then((tokenStr) => res.status(201).send({message: 'login success', token: 'Bearer ' + tokenStr,}))
}

export default {
    register,
    login
}