import promisify from '../utils/promise.js'

const getAllCategories = () => {
    return promisify('select * from ev_article_cate where is_deleted=0 order by id asc')
}

const getCategoryByNameOrAlias = (name, alias) => {
    return promisify('select * from ev_article_cate where is_deleted=0 and (name=? or alias=?)', [name, alias])
}

const insertCategory = (category) => {
    return promisify('insert into ev_article_cate set ?', [category])
}

const markCategoryDeletedById = (id) => {
    return promisify('update ev_article_cate set is_deleted=1 where id=?', [id])
}

const getCategoryById = (id) => {
    return promisify('select * from ev_article_cate where is_deleted=0 and id=?', [id])
}

const getCategoryByNameOrAliasExceptId = (id, name, alias) => {
    return promisify('select * from ev_article_cate where is_deleted=0 and id<>? and (name=? or alias=?)', [id, name, alias])
}

const updateCategoryById = (category, id) => {
    return promisify('update ev_article_cate set ? where id=?', [category, id])
}

export default {
    getAllCategories,
    getCategoryByNameOrAlias,
    insertCategory,
    markCategoryDeletedById,
    getCategoryById,
    getCategoryByNameOrAliasExceptId,
    updateCategoryById
}