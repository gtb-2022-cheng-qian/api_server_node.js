// 创建 config.js 文件，并向外共享 加密 和 还原 Token 的 jwtSecretKey 字符串

module.exports = {
    port: process.env.PORT || 8080,
    hostname: '127.0.0.1',
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '72641218',
        database: 'my_dd_01',
    },
    jwtSecretKey: 'thoughtworks',
    expiresIn: '10h'
}