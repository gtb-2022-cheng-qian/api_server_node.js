// 单纯的使用 if...else... 的形式对数据合法性进行验证，效率低下、出错率高、维护性差。
// 因此，推荐使用第三方数据验证模块，来降低出错率、提高验证的效率与可维护性，让后端程序员把更多的精力放在核心业务逻辑的处理上。
// 安装 joi 包，为表单中携带的每个数据项，定义验证规则
// 安装 @escook/express-joi 中间件，来实现自动对表单数据进行验证的功能

const joi = require('joi');
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const usernameSchema = joi.string().alphanum().min(1).max(10).required();
// 密码的验证规则
const passwordSchema = joi.string().pattern(/^[\S]{6,12}$/).required();
// id 的验证规则
const idSchema = joi.number().integer().min(1).required();
// nickname 的验证规则
const nicknameSchema = joi.string().required();
// email 的验证规则
const emailSchema = joi.string().email().required();
// avatar 的验证规则
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatarSchema = joi.string().dataUri().required();

// 导出注册和登陆表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对req.body中的username和password进行验证
    body: {
        username: usernameSchema,
        password: passwordSchema
    }
}

// 导出更新表单的验证规则对象
exports.update_schema={
    body: {
        id: idSchema,
        nickname: nicknameSchema,
        email: emailSchema
    }
}

// 导出更新密码表单的验证规则对象
// 核心验证思路：旧密码与新密码，必须符合密码的验证规则，并且新密码不能与旧密码一致！
exports.updatePwd_schema={
    body: {
        // 使用 password 这个规则，验证 req.body.oldPwd 的值
        oldPwd: passwordSchema,
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(passwordSchema)
    }
}

// 导出更新头像表单的验证规则对象
exports.updateAvatar_schema={
    body: {
        avatar: avatarSchema
    }
}