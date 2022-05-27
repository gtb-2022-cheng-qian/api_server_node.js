import joi from 'joi'

// 通过 express-joi 自动验证 req.body 中的文本数据；通过 if 判断手动验证 req.file 中的文件数据
export const add_article_schema = {
    body: {
        title: joi.string().required(),
        cate_id: joi.number().integer().min(1).required(),
        content: joi.string().required().allow(''),
        state: joi.string().valid('published', 'draft').required(),
        cover_img: joi.string().required()
    }
}

export const get_articles_schema = {
    query: {
        pagenum: joi.number().integer().min(1).required(),
        pagesize: joi.number().integer().min(1).required(),
        cate_id: joi.string(),
        state: joi.string().valid('published', 'draft')
    }
}

export const delete_article_schema = {
    params: {
        id: joi.string().min(1).required()
    }
}

export const get_articlesById_schema = {
    params: {
        id: joi.string().min(1).required()
    }
}

export const edit_article_schema = {
    body: {
        id: joi.number().integer().min(1).required(),
        title: joi.string().required(),
        cate_id: joi.number().integer().min(1).required(),
        content: joi.string().required().allow(''),
        state: joi.string().valid('published', 'draft').required(),
        cover_img: joi.string().required()
    }
}