const express = require('express')
// 导入cors中间件解决跨域问题
const cors = require('cors')
// 导入 验证规则 模块
const joi = require('joi')
// 导入config模块
const config = require('./config.js')
// 导入解析token的模块
const expressJwt = require('express-jwt')
// 导入用户路由模块
const userRouter = require('../router/userRegAndLog.js')
// 导入用户信息路由模块
const userinfoRouter = require('../router/userInfo')
const articleCategoryRouter = require('../router/articleCategory')
const articleRouter = require('../router/article')

// 创建 express 的服务器实例
const app = express()

// 配置cors中间件
app.use(cors());
// 配置解析表单数据中间件
app.use(express.urlencoded({extended: false}))
// 在处理函数中，需要多次调用 res.send() 向客户端响应 错误处理 的结果，为了简化代码，可以手动封装一个 res.cc() 函数
app.use((req, res, next) => {
  res.cc = (err) => {
    res.send({
      // 状态
      status: 1,
      // 判断err是对象还是字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
//配置将jwt字符串解析为json对象的中间件
//只要成功配置express-jwt中间件，就可以把解析出来的用户信息挂载到req.user
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 配置路由
app.use('/api', userRouter)
// 注意：不以 /api 开头的接口，都是需要权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)
app.use('/article', articleCategoryRouter)
app.use('/article', articleRouter)

// 错误处理中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc('data validation failed')
  // 身份认证失败
  if (err.name === 'UnauthorizedError') return res.cc('identity authentication failed')
  // 其他错误
  res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8080, () => {
    console.log('api server running at http://127.0.0.1:8080')
})