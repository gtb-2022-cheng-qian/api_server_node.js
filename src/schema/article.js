import joi from "joi"

// 通过 express-joi 自动验证 req.body 中的文本数据；通过 if 判断手动验证 req.file 中的文件数据
const titleSchema = joi.string().required();
const cate_idSchema = joi.number().integer().min(1).required();
const contentSchema = joi.string().required().allow('');
const stateSchema = joi.string().valid('published', 'draft').required();

const pageNumSchema = joi.number().integer().min(1).required();
const pageSizeSchema = joi.number().integer().min(1).required();

const idSchema = joi.string().min(1).required()

export const add_article_schema = {
    body: {
        title: titleSchema,
        cate_id: cate_idSchema,
        content: contentSchema,
        state: stateSchema
    }
}

export const get_articles_schema = {
    query: {
        pagenum: pageNumSchema,
        pagesize: pageSizeSchema,
        cate_id: joi.string(),
        state: joi.string().valid('published', 'draft')
    }
}

export const delete_article_schema = {
    params: {
        id: idSchema
    }
}

export const get_articlesById_schema = {
    params: {
        id: idSchema
    }
}

export const edit_article_schema = {
    body: {
        id: joi.number().integer().min(1).required(),
        title: titleSchema,
        cate_id: cate_idSchema,
        content: contentSchema,
        state: stateSchema
    }
}