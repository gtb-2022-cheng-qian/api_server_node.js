const db = require("../../../db/index.js");
exports.getCategoryList = (req, res) => {
    return new Promise((resolve) => {
        db.query('select * from ev_article_cate where is_deleted=0 order by id asc', (err, results) => {
            if (err) return res.cc('sql error');
            resolve(results);
        })
    })
}

exports.getCategoryByNameOrAlias = (req, res) => {
    db.query('select * from ev_article_cate where name=? or alias=?', [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc('sql error');
        if (results.length > 0) return res.cc('category name or alias already exists');
    })
}

exports.addCategory = (req, res) => {
    db.query('insert into ev_article_cate set ?', [req.body], (err, results) => {
        if (err) return res.cc('sql error');
        if (results.affectedRows !== 1) return res.cc('insert failed');
    })
}

exports.markCategoryDeleted = (req, res) => {
    db.query('update ev_article_cate set is_deleted=1 where id=?', [req.params.id], (err, results) => {
        if (err) return res.cc('sql error');
        if (results.affectedRows !== 1) return res.cc('delete failed');
    })
}

exports.getCategoryById = (req, res) => {
    return new Promise((resolve) => {
        db.query('select * from ev_article_cate where id=?', [req.params.id], (err, results) => {
            if (err) return res.cc('sql error');
            if (results.length !== 1) return res.cc('category query error');
            resolve(results[0]);
        })
    })
}

exports.getCategoryByNameOrAliasExceptId = (req, res) => {
    db.query('select * from ev_article_cate where id<>? and (name=? or alias=?)', [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc('sql error');
        if (results.length > 0) return res.cc('category name or alias already exists');
    })
}

exports.updateCategoryById= (req, res) => {
    db.query('update ev_article_cate set ? where id=?', [req.body, req.body.id], (err, results) => {
        if (err) return res.cc('sql error');
        if (results.affectedRows !== 1) return res.cc('update failed');
    })
}