// 在项目根目录中新建 /db/index.js 文件，在此自定义模块中创建数据库的连接对象

import mysql from 'mysql'
import config from '../config.js'

// 创建连接
const db = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
})

// 导出连接
export default db