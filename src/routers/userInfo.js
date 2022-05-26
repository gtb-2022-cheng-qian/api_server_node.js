import express from "express"
// 导入验证数据合法性中间件
import expressJoi from "@escook/express-joi"
// 导入所需验证规则对象
import {update_schema, updatePwd_schema, updateAvatar_schema} from "../schema/user.js"
//导入用户信息处理函数模块
import userInfoController from "../controller/userInfo.js"
import {routeHandler} from "../utils/routeHandler.js"

const router = express.Router()

// 获取用户的基本信息
router.get('/userinfo', routeHandler(userInfoController.getUserInfo))
// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_schema), routeHandler(userInfoController.updateUserInfo))
// 重置密码
router.post('/update/pwd', expressJoi(updatePwd_schema), routeHandler(userInfoController.updatePwd))
// 更新用户头像
router.post('/update/avatar', expressJoi(updateAvatar_schema), routeHandler(userInfoController.updateAvatar))

export default router