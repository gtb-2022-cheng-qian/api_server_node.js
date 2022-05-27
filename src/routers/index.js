import express from 'express'
import userRouter from './userRegAndLog.js'
import userInfoRouter from './userInfo.js'
import articleCategoryRouter from './articleCategory.js'
import articleRouter from './article.js'

const router = express.Router()

// 配置路由
router.use('/api/user', userRouter)
// 注意：不以 /api/user 开头的接口，都是需要身份认证的接口，需要进行 Token 身份认证
router.use('/api/my', userInfoRouter)
router.use('/api/article/category', articleCategoryRouter)
router.use('/api/article', articleRouter)

export default router