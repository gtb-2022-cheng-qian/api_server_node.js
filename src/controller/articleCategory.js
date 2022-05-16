import service from '../service/articleCategory.js'

const getArticleCategory = (req, res) => {
    service.getCategoryList()
        .then(results => res.status(200).send({message: 'query success', data: results}))
        .catch(err => res.status(500).send({message: err}))
};

const postArticleCategory = (req, res) => {
    service.addArticleCategory(req)
        .then(() => res.status(201).send({message: 'insert success'}))
        .catch(err => res.status(500).send({message: err}))
}

const deleteArticleCategoryById = (req, res) => {
    service.deleteArticleCategory(req)
        .then(() => res.status(200).send({message: 'delete success'}))
        .catch(err => res.status(500).send({message: err}))
}

const getArticleCategoryById = (req, res) => {
    service.getArticleCategory(req)
        .then(result => res.status(200).send({message: 'query success', data: result}))
        .catch(err => res.status(500).send({message: err}))
}

const updateArticleCategoryById = (req, res) => {
    service.updateArticleCategory(req)
        .then(() => res.status(201).send({message: 'update success'}))
        .catch(err => res.status(500).send({message: err}))
}

export default {
    getArticleCategory,
    postArticleCategory,
    deleteArticleCategoryById,
    getArticleCategoryById,
    updateArticleCategoryById
}