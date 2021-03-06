// 导入加密模块
import bcrypt from 'bcryptjs'
// 导入 jsonwebtoken 模块
import jwt from 'jsonwebtoken'
// 导入 config 模块
import config from '../../config.js'
import repo from '../repository/userRegAndLog.js'
import {BadRequestError, ConflictError, NotFoundError} from '../exception/ApplicationError.js'

/*
 注册 步骤：
  1.检测表单数据是否合法
  2.检测用户名是否被占用
  3.对密码进行加密处理
  4.插入新用户
*/
const clientRegister = (req) => {
    // 2.检测用户名是否被占用
    return repo.getUserInfoByUsername(req.body.username)
        .then((results) => {
            // 如果查询结果不为空，则说明用户名已被占用
            if (results.length > 0) throw new ConflictError('username is already used')

            // 3.对密码进行加密处理
            //  在当前项目中，使用 bcryptjs 对用户密码进行加密，优点：
            //  加密之后的密码，无法被逆向破解
            //  同一明文密码多次加密，得到的加密结果各不相同，保证了安全性
            req.body.password = bcrypt.hashSync(req.body.password, 10)

            // 4.插入新用户
            return repo.insertUser(req.body)
                .then((results) => {
                    if (results.affectedRows !== 1) throw new BadRequestError('insert error')
                    return results
                })
        })
}

/*
 登录 步骤：
  1.检测表单数据是否合法
  2.根据用户名查询用户的数据
  3.判断用户输入的密码是否正确
  4.生成 JWT 的 Token 字符串
*/
const clientLogin = (req) => {
    // 2.根据用户名查询用户的数据
    return repo.getUserInfoByUsername(req.body.username)
        .then(results => {
            if (results.length !== 1) throw new NotFoundError('username or password error')

            // 3.判断用户输入的密码是否正确
            // 核心实现思路：调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
            // 返回值是布尔值（true 一致、false 不一致）
            const compareResult = bcrypt.compareSync(req.body.password, results[0].password)
            if (!compareResult) throw new ConflictError('username or password error')

            // 4.生成 JWT 的 Token 字符串
            // 核心注意点：在生成 Token 字符串的时候，一定要剔除 密码 和 头像 的值
            const user = {...results[0], password: '', user_pic: ''}
            // 对用户信息进行加密，生成token字符串
            return jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
        })
}

export default {
    clientRegister,
    clientLogin
}