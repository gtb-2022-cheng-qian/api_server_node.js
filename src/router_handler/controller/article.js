const service = require('../service/article.js');

exports.addArticle = (req, res) => {
    service.addNewArticle(req)
        .then(() => res.status(201).send({message: 'article add success'}))
        .catch(err => res.status(500).send({message: err}))
}

exports.getArticleList = (req, res) => {
    service.getAllArticle(req)
        .then(results => res.status(200).send({message: 'article list success', data: results}))
        .catch(err => res.status(500).send({message: err}))
}

exports.deleteArticle = (req, res) => {
    service.deleteArticleById(req)
        .then(() => res.status(200).send({message: 'article delete success'}))
        .catch(err => res.status(500).send({message: err}))
}

exports.getSingleArticle = (req, res) => {
    service.getArticleById(req)
        .then(result => res.status(200).send({message: 'article get success', data: result}))
        .catch(err => res.status(500).send({message: err}))
}

exports.editArticle = (req, res) => {
    service.editArticleById(req)
        .then(() => res.status(201).send({message: 'article edit success'}))
        .catch(err => res.status(500).send({message: err}))
}