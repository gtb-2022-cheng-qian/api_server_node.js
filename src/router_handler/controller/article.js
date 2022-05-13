const service = require('../service/article.js');

exports.addArticle = (req, res) => {
    service.addNewArticle(req)
        .then(() => {
            res.send({
                status: 0,
                message: 'article add success',
            })
        })
        .catch(err => res.cc(err))
}

exports.getArticleList = (req, res) => {
    service.getAllArticle(req)
        .then(results => {
            res.send({
                status: 0,
                message: 'article list success',
                data: results
            })
        })
        .catch(err => res.cc(err))
}

exports.deleteArticle = (req, res) => {
    service.deleteArticleById(req)
        .then(() => {
            res.send({
                status: 0,
                message: 'article delete success',
            })
        })
        .catch(err => res.cc(err))
}

exports.getSingleArticle = (req, res) => {
    service.getArticleById(req)
        .then(result => {
            res.send({
                status: 0,
                message: 'article get success',
                data: result
            })
        })
        .catch(err => res.cc(err))
}

exports.editArticle = (req, res) => {
    service.editArticleById(req)
        .then(() => {
            res.send({
                status: 0,
                message: 'article edit success',
            })
        })
        .catch(err => res.cc(err))
}