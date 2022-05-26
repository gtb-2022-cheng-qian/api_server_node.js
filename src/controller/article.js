import service from '../service/article.js'

const addArticle = (req, res) => {
    return service.addNewArticle(req)
        .then(() => res.status(201).send({message: 'article add success'}))
}

const getArticleList = (req, res) => {
    return service.getAllArticle(req)
        .then(results => res.status(200).send({message: 'article list success', data: results}))
}

const deleteArticle = (req, res) => {
    return service.deleteArticleById(req)
        .then(() => res.status(200).send({message: 'article delete success'}))
}

const getSingleArticle = (req, res) => {
    return service.getArticleById(req)
        .then(result => res.status(200).send({message: 'article get success', data: result}))
}

const editArticle = (req, res) => {
    return service.editArticleById(req)
        .then(() => res.status(201).send({message: 'article edit success'}))
}

export default {
    addArticle,
    getArticleList,
    deleteArticle,
    getSingleArticle,
    editArticle
}