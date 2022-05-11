const db = require("../../../db/index.js")

exports.insertArticle = (req, res, articleInfo) => {
    db.query('insert into ev_articles set ?', [articleInfo], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('article add failed')
    })
}

exports.getArticleListByPage = (req, res, sql, value) => {
    return new Promise((resolve) => {
        db.query(sql, value, (err, results) => {
            if (err) return res.cc('sql error')
            resolve(results)
        })
    })
}

exports.markArticleAsDeleted = (req, res) => {
    db.query('update ev_articles set is_deleted=1 where id=?', [req.params.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('article delete failed')
    })
}

exports.getArticleById= (req, res) => {
    return new Promise((resolve) => {
        db.query('select * from ev_articles where id=?', [req.params.id], (err, results) => {
            if (err) return res.cc('sql error')
            if (results.length !== 1) return res.cc('article not found')
            resolve(results[0])
        })
    })
}

exports.updateArticleById = (req, res, articleInfo) => {
    db.query('update ev_articles set ? where id=?', [articleInfo, req.body.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('article edit failed')
    })
}