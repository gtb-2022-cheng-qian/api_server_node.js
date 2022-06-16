import express from 'express'
// 导入cors中间件解决跨域问题
import cors from 'cors'
// 导入 验证规则 模块
import joi from 'joi'
// 导入解析token的模块
import expressJwt from 'express-jwt'
// 导入解析form-data的模块
import multer from "multer"
// 导入config模块
import config from '../config.js'
// 导入路由模块
import router from './routers/index.js'
import {NotFoundError, BadRequestError, DatabaseError, ConflictError} from './exception/ApplicationError.js'
import path from "path";// CWD PWD

// 创建 express 的服务器实例
const app = express()

// 配置cors中间件
app.use(cors());
// 配置解析表单数据中间件
app.use(express.urlencoded({extended: false}))
//配置将jwt字符串解析为json对象的中间件
//只要成功配置express-jwt中间件，就可以把解析出来的用户信息挂载到req.user
app.use(expressJwt({secret: config.jwtSecretKey}).unless({path: [/^\/api\/user\//, /^\/api\/article\/image\//]}))
// 分享静态资源
app.use('/api/article/image', express.static(path.join( '/src/uploads')))

// 配置路由
app.use('/', router)

// 错误处理中间件
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.status(400).send({message: 'data validation failed'})
    // 身份认证失败
    if (err instanceof expressJwt.UnauthorizedError) return res.status(401).send({message: 'identity authentication failed'})
    // 图片上传失败
    if (err instanceof multer.MulterError) return res.status(400).send({message: 'image upload failed'})
    // 其他错误
    if (err instanceof NotFoundError || err instanceof ConflictError) return res.status(400).send({message: err.message})
    if (err instanceof BadRequestError || err instanceof DatabaseError) return res.status(500).send({message: err.message})
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(config.port, () => {
    console.log('api server running at http://' + config.hostname + ':' + config.port)
})