// 初始化 路由 模块
// 初始化 路由处理函数 模块
// 获取用户的基本信息

// 初始化 路由 模块
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

//导入用户信息处理函数模块
const userInfoHandler = require('../router_handler/userInfo')

// 导入验证数据合法性中间件
const expressJoi = require('@escook/express-joi')
// 导入所需验证规则对象
const {update_schema, updatePwd_schema, updateAvatar_schema} = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userInfoHandler.getUserInfo)

// 更新用户的基本信息 步骤
// 1.定义路由和处理函数
// 2.验证表单数据
// 3.实现更新用户基本信息的功能
router.post('/userinfo', expressJoi(update_schema), userInfoHandler.updateUserInfo)

// 重置密码
router.post('/update/pwd', expressJoi(updatePwd_schema), userInfoHandler.updatePwd)

// 更新用户头像
router.post('/update/avatar', expressJoi(updateAvatar_schema), userInfoHandler.updateAvatar)

// 向外共享路由对象
module.exports = router