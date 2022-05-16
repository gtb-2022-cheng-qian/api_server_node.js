import express from 'express'
// 导入cors中间件解决跨域问题
import cors from 'cors'
// 导入 验证规则 模块
import joi from 'joi'
// 导入解析token的模块
import expressJwt from 'express-jwt'
// 导入config模块
import config from '../config.js'
// 导入用户以及文章路由模块
import userRouter from './routers/userRegAndLog.js'
import userInfoRouter from './routers/userInfo.js'
import articleCategoryRouter from './routers/articleCategory.js'
import articleRouter from './routers/article.js'

// 创建 express 的服务器实例
const app = express()

// 配置cors中间件
app.use(cors());
// 配置解析表单数据中间件
app.use(express.urlencoded({extended: false}))
//配置将jwt字符串解析为json对象的中间件
//只要成功配置express-jwt中间件，就可以把解析出来的用户信息挂载到req.user
app.use(expressJwt({secret: config.jwtSecretKey}).unless({path: [/^\/api\/user\//]}))

// 配置路由?
app.use('/api/user', userRouter)
// 注意：不以 /api 开头的接口，都是需要权限的接口，需要进行 Token 身份认证
app.use('/api/my', userInfoRouter)
app.use('/api/article', articleCategoryRouter)
app.use('/api/article', articleRouter)

// 错误处理中间件
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) res.status(400).send({message: 'data validation failed'})
    // 身份认证失败
    if (err.name === 'UnauthorizedError') res.status(401).send({message: 'identity authentication failed'})
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(config.port, () => {
    console.log('api server running at http://' + config.hostname + ':' + config.port)
})