const {getPromise} = require('../utils/promise.js');

const insertArticle = (articleInfo) => {
    return getPromise('insert into ev_articles set ?', [articleInfo])
}

const getArticleListByPage = (sql, value) => {
    return getPromise(sql, value)
}

const markArticleAsDeletedById = (id) => {
    return getPromise('update ev_articles set is_deleted = 1 where id = ?', [id])
}

const getArticleById = (id) => {
    return getPromise('select * from ev_articles where id = ?', [id])
}

const updateArticleById = (articleInfo, id) => {
    return getPromise('update ev_articles set ? where id = ?', [articleInfo, id])
}

module.exports = {
    insertArticle,
    getArticleListByPage,
    markArticleAsDeletedById,
    getArticleById,
    updateArticleById
}