const express = require('express')
//导入用户信息处理函数模块
const userInfoController = require('../router_handler/controller/userInfo')
// 导入验证数据合法性中间件
const expressJoi = require('@escook/express-joi')
// 导入所需验证规则对象
const {update_schema, updatePwd_schema, updateAvatar_schema} = require('../schema/user')

const router = express.Router()

// 获取用户的基本信息
router.get('/userinfo', userInfoController.getUserInfo)

// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_schema), userInfoController.updateUserInfo)

// 重置密码
router.post('/update/pwd', expressJoi(updatePwd_schema), userInfoController.updatePwd)

// 更新用户头像
router.post('/update/avatar', expressJoi(updateAvatar_schema), userInfoController.updateAvatar)

module.exports = router