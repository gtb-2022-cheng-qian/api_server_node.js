import promisify from "../utils/promise.js"

const insertArticle = (articleInfo) => {
    return promisify('insert into ev_articles set ?', [articleInfo])
}

const getArticleListByPage = (sql, value) => {
    return promisify(sql, value)
}

const getArticleCountNumber = (sql, value) => {
    return promisify(sql, value)
}

const markArticleAsDeletedById = (id) => {
    return promisify('update ev_articles set is_deleted = 1 where id = ?', [id])
}

const getArticleById = (id) => {
    return promisify('select * from ev_articles where is_deleted = 0 and id = ?', [id])
}

const updateArticleById = (articleInfo, id) => {
    return promisify('update ev_articles set ? where id = ?', [articleInfo, id])
}

export default {
    insertArticle,
    getArticleListByPage,
    markArticleAsDeletedById,
    getArticleById,
    updateArticleById,
    getArticleCountNumber
}