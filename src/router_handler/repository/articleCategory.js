const {getPromise} = require('./promise.js');

const getAllCategories = () => {
    return getPromise('select * from ev_article_cate where is_deleted=0 order by id asc')
}

const getCategoryByNameOrAlias = (name, alias) => {
    return getPromise('select * from ev_article_cate where name=? or alias=?', [name, alias])
}

const insertCategory = (category) => {
    return getPromise('insert into ev_article_cate set ?', [category])
}

const markCategoryDeletedById = (id) => {
    return getPromise('update ev_article_cate set is_deleted=1 where id=?', [id])
}

const getCategoryById = (id) => {
    return getPromise('select * from ev_article_cate where id=?', [id])
}

const getCategoryByNameOrAliasExceptId = (id, name, alias) => {
    return getPromise('select * from ev_article_cate where id<>? and (name=? or alias=?)', [id, name, alias])
}

const updateCategoryById = (category, id) => {
    return getPromise('update ev_article_cate set ? where id=?', [category, id])
}

module.exports = {
    getAllCategories,
    getCategoryByNameOrAlias,
    insertCategory,
    markCategoryDeletedById,
    getCategoryById,
    getCategoryByNameOrAliasExceptId,
    updateCategoryById
}