const joi = require('joi');

const nameSchema = joi.string().min(1).max(50).required();
const aliasSchema = joi.string().min(1).max(50).required();
const idSchema = joi.number().integer().min(1).required();

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
