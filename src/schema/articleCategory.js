import joi from "joi";

export const add_articleCategory_schema = {
    body: {
        name: joi.string().min(1).max(50).required(),
        alias: joi.string().min(1).max(50).required()
    }
}

export const delete_articleCategoryById_schema = {
    params: {
        id: joi.string().min(1).required()
    }
}

export const get_articleCategoryById_schema = {
    params: {
        id: joi.string().min(1).required()
    }
}

export const update_articleCategoryById_schema = {
    body: {
        id: joi.number().integer().min(1).required(),
        name: joi.string().min(1).max(50).required(),
        alias: joi.string().min(1).max(50).required()
    }
}
