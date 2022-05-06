const joi = require('joi');

const nameSchema = joi.string().min(1).max(50).required();
const aliasSchema = joi.string().min(1).max(50).required();
const idSchema = joi.number().integer().min(1).required();

// 通过 express-joi 自动验证 req.body 中的文本数据；通过 if 判断手动验证 req.file 中的文件数据
const titleSchema = joi.string().required();
const cate_idSchema = joi.number().integer().min(1).required();
const contentSchema = joi.string().required().allow('');
const stateSchema = joi.string().valid('published', 'draft').required();

exports.add_articleCategory_schema = {
    body: {
        name: nameSchema,
        alias: aliasSchema
    }
}

exports.delete_articleCategoryById_schema = {
    params: {
        id: idSchema
    }
}

exports.get_articleCategoryById_schema = {
    params: {
        id: idSchema
    }
}

exports.update_articleCategoryById_schema = {
    body: {
        id: idSchema,
        name: nameSchema,
        alias: aliasSchema
    }
}

exports.add_article_schema = {
    body: {
        title: titleSchema,
        cate_id: cate_idSchema,
        content: contentSchema,
        state: stateSchema
    }
}