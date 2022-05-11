// 在项目根目录中，新建 router 文件夹，用来存放所有的路由模块

const express = require('express');
// 导入用户路由处理函数
const userHandler = require('../router_handler/service/userRegAndLog.js');
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则对象
const {reg_login_schema} = require('../schema/user.js')

// 创建路由对象
const router = express.Router();

// 注册新用户
// 1.检测表单数据是否合法
// 1.1.在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 1.2.数据验证通过后，会把这次请求流转给后面的路由处理函数
// 1.3.数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post('/register', expressJoi(reg_login_schema), userHandler.register)

// 登录
// 1.检测表单数据是否合法
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

// 将路由对象导出
module.exports = router;