import joi from "joi";

const nameSchema = joi.string().min(1).max(50).required();
const aliasSchema = joi.string().min(1).max(50).required();
const idSchema = joi.string().min(1).required();

export const add_articleCategory_schema = {
    body: {
        name: nameSchema,
        alias: aliasSchema
    }
}

export const delete_articleCategoryById_schema = {
    params: {
        id: idSchema
    }
}

export const get_articleCategoryById_schema = {
    params: {
        id: idSchema
    }
}

export const update_articleCategoryById_schema = {
    body: {
        id: joi.number().integer().min(1).required(),
        name: nameSchema,
        alias: aliasSchema
    }
}
