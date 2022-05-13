const db = require("../../../db/index.js");

const getAllCategories = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from ev_article_cate where is_deleted=0 order by id asc', (err, results) => {
            if (err) return reject('sql error');
            resolve(results);
        })
    })
}

const getCategoryByNameOrAlias = (name, alias) => {
    return new Promise((resolve, reject) => {
        db.query('select * from ev_article_cate where name=? or alias=?', [name, alias], (err, results) => {
            if (err) return reject('sql error');
            resolve(results);
        })
    })
}

const insertCategory = (category) => {
    return new Promise((resolve, reject) => {
        db.query('insert into ev_article_cate set ?', [category], (err, results) => {
            if (err) return reject('sql error');
            resolve(results);
        })
    })
}

const markCategoryDeletedById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('update ev_article_cate set is_deleted=1 where id=?', [id], (err, results) => {
            if (err) return reject('sql error');
            resolve(results);
        })
    })
}

const getCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('select * from ev_article_cate where id=?', [id], (err, results) => {
            if (err) return reject('sql error');
            resolve(results);
        })
    })
}

const getCategoryByNameOrAliasExceptId = (id, name, alias) => {
    return new Promise((resolve, reject) => {
        db.query('select * from ev_article_cate where id<>? and (name=? or alias=?)', [id, name, alias], (err, results) => {
            if (err) return reject('sql error');
            resolve(results);
        })
    })
}

const updateCategoryById = (category, id) => {
    return new Promise((resolve, reject) => {
        db.query('update ev_article_cate set ? where id=?', [category, id], (err, results) => {
            if (err) return reject('sql error');
            resolve(results);
        })
    })
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