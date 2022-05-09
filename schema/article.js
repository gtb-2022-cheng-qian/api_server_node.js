const joi = require('joi');

// 通过 express-joi 自动验证 req.body 中的文本数据；通过 if 判断手动验证 req.file 中的文件数据
const titleSchema = joi.string().required();
const cate_idSchema = joi.number().integer().min(1).required();
const contentSchema = joi.string().required().allow('');
const stateSchema = joi.string().valid('published', 'draft').required();

const pageNumSchema = joi.number().integer().min(1).required();
const pageSizeSchema = joi.number().integer().min(1).required();

const idSchema = joi.number().integer().min(1).required()

exports.add_article_schema = {
    body: {
        title: titleSchema,
        cate_id: cate_idSchema,
        content: contentSchema,
        state: stateSchema
    }
}

exports.get_articles_schema = {
    query: {
        pagenum: pageNumSchema,
        pagesize: pageSizeSchema,
        cate_id: joi.string(),
        state: joi.string().valid('published', 'draft')
    }
}

exports.delete_article_schema = {
    params: {
        id: idSchema
    }
}

exports.get_articlesById_schema = {
    params: {
        id: idSchema
    }
}

exports.edit_article_schema = {
    body: {
        id: idSchema,
        title: titleSchema,
        cate_id: cate_idSchema,
        content: contentSchema,
        state: stateSchema
    }
}