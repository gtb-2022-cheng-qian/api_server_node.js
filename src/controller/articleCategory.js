import service from '../service/articleCategory.js'

const getArticleCategory = (req, res) => {
    return service.getCategoryList()
        .then(results => res.status(200).send({message: 'query success', data: results}))
};

const postArticleCategory = (req, res) => {
    return service.addArticleCategory(req)
        .then(() => res.status(201).send({message: 'insert success'}))
}

const deleteArticleCategoryById = (req, res) => {
    return service.deleteArticleCategory(req)
        .then(() => res.status(200).send({message: 'delete success'}))
}

const getArticleCategoryById = (req, res) => {
    return service.getArticleCategory(req)
        .then(result => res.status(200).send({message: 'query success', data: result}))
}

const updateArticleCategoryById = (req, res) => {
    return service.updateArticleCategory(req)
        .then(() => res.status(201).send({message: 'update success'}))
}

export default {
    getArticleCategory,
    postArticleCategory,
    deleteArticleCategoryById,
    getArticleCategoryById,
    updateArticleCategoryById
}