//在项目根目录中，新建 router_handler 文件夹，用来存放所有的 路由处理函数模块

// 导入加密模块
const bcrypt = require('bcryptjs')
// 导入 jsonwebtoken 模块
const jwt = require('jsonwebtoken')
// 导入 config 模块
const config = require('../../config.js')
const userRegAndLog = require('../repository/userRegAndLog.js')

/*
 注册 步骤：
  1.检测表单数据是否合法
  2.检测用户名是否被占用
  3.对密码进行加密处理
  4.插入新用户
*/
exports.register = (req, res) => {
    // 2.检测用户名是否被占用
    userRegAndLog.checkUsername(req, res)

    // 3.对密码进行加密处理
    //  在当前项目中，使用 bcryptjs 对用户密码进行加密，优点：
    //  加密之后的密码，无法被逆向破解
    //  同一明文密码多次加密，得到的加密结果各不相同，保证了安全性
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    // 4.插入新用户
    userRegAndLog.addUser(req, res)

    // 如果插入成功，则返回成功信息
    res.send({
        status: 0,
        message: 'register success'
    });
}

/*
 登录 步骤：
  1.检测表单数据是否合法
  2.根据用户名查询用户的数据
  3.判断用户输入的密码是否正确
  4.生成 JWT 的 Token 字符串
*/
exports.login = async (req, res) => {
    // 2.根据用户名查询用户的数据
    const userInfo = await userRegAndLog.getUserInfoByUsername(req, res)

    // 3.判断用户输入的密码是否正确
    // 核心实现思路：调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
    // 返回值是布尔值（true 一致、false 不一致）
    const compareResult = bcrypt.compareSync(req.body.password, userInfo.password);
    if (!compareResult) return res.cc('password error')

    // 4.生成 JWT 的 Token 字符串
    // 核心注意点：在生成 Token 字符串的时候，一定要剔除 密码 和 头像 的值
    const user = {...userInfo, password: '', user_pic: ''}
    // 对用户信息进行加密，生成token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn});
    //把生成的token字符串返回客户端
    res.send({
        status: 0,
        message: 'login success',
        // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
        token: 'Bearer ' + tokenStr,
    })
}