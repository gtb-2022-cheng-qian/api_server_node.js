// 单纯的使用 if...else... 的形式对数据合法性进行验证，效率低下、出错率高、维护性差。
// 因此，推荐使用第三方数据验证模块，来降低出错率、提高验证的效率与可维护性，让后端程序员把更多的精力放在核心业务逻辑的处理上。
// 安装 joi 包，为表单中携带的每个数据项，定义验证规则
// 安装 @escook/express-joi 中间件，来实现自动对表单数据进行验证的功能

import joi from 'joi'

// 导出注册和登陆表单的验证规则对象
export const reg_login_schema = {
    // 表示需要对req.body中的username和password进行验证
    body: {
        username: joi.string().alphanum().min(1).max(10).required(),
        password: joi.string().pattern(/^\S{6,12}$/).required()
    }
}

// 导出更新表单的验证规则对象
export const update_schema = {
    body: {
        id: joi.number().integer().min(1).required(),
        nickname: joi.string().required(),
        email: joi.string().email().required()
    }
}

// 导出更新密码表单的验证规则对象
// 核心验证思路：旧密码与新密码，必须符合密码的验证规则，并且新密码不能与旧密码一致！
export const updatePwd_schema = {
    body: {
        // 使用 password 这个规则，验证 req.body.oldPwd 的值
        oldPwd: joi.string().pattern(/^\S{6,12}$/).required(),
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(joi.string().pattern(/^\S{6,12}$/).required())
    }
}

// 导出更新头像表单的验证规则对象
export const updateAvatar_schema = {
    body: {
        // avatar 的验证规则
        // dataUri() 指的是如下格式的字符串数据：
        // data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
        avatar: joi.string().dataUri().required()
    }
}