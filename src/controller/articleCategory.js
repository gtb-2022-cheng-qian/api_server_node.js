const service = require('../service/articleCategory.js');

exports.getArticleCategory = (req, res) => {
    service.getCategoryList()
        .then(results => res.status(200).send({message: 'query success', data: results}))
        .catch(err => res.status(500).send({message: err}))
};

exports.postArticleCategory = (req, res) => {
    service.addArticleCategory(req)
        .then(() => res.status(201).send({message: 'insert success'}))
        .catch(err => res.status(500).send({message: err}))
}

exports.deleteArticleCategoryById = (req, res) => {
    service.deleteArticleCategory(req)
        .then(() => res.status(200).send({message: 'delete success'}))
        .catch(err => res.status(500).send({message: err}))
}

exports.getArticleCategoryById = (req, res) => {
    service.getArticleCategory(req)
        .then(result => res.status(200).send({message: 'query success', data: result}))
        .catch(err => res.status(500).send({message: err}))
}

exports.updateArticleCategoryById = (req, res) => {
    service.updateArticleCategory(req)
        .then(() => res.status(201).send({message: 'update success'}))
        .catch(err => res.status(500).send({message: err}))
}