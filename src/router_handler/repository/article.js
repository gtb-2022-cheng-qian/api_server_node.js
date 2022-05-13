const db = require("../../../db/index.js")

const insertArticle = (articleInfo) => {
    return new Promise((resolve, reject) => {
        db.query('insert into ev_articles set ?', [articleInfo], (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

const getArticleListByPage = (sql, value) => {
    return new Promise((resolve, reject) => {
        db.query(sql, value, (err, results) => {
            if (err) return reject ('sql error')
            resolve(results)
        })
    })
}

const markArticleAsDeletedById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('update ev_articles set is_deleted=1 where id=?', [id], (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

const getArticleById= (id) => {
    return new Promise((resolve, reject) => {
        db.query('select * from ev_articles where id=?', [id], (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

const updateArticleById = (articleInfo, id) => {
    return new Promise((resolve, reject) => {
        db.query('update ev_articles set ? where id=?', [articleInfo, id], (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

module.exports = {
    insertArticle,
    getArticleListByPage,
    markArticleAsDeletedById,
    getArticleById,
    updateArticleById
}