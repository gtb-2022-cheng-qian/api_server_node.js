const path = require('path');
const db = require('../../../db');

exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('cover_img is required')

    const articleInfo = {
        ...req.body,
        cover_img: path.join('uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }

    db.query('insert into ev_articles set ?', articleInfo, (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('article add failed')
        res.send({
            status: 0,
            message: 'article add success',
        })
    })
}

exports.getArticleList = (req, res) => {
    const {pagenum, pagesize, cate_id, state} = req.query
    const selectSql = 'select a.id, a.title, a.pub_date, a.state, b.name as cate_name from ev_articles a, ev_article_cate b'
    let sql = selectSql + ' where a.is_deleted=0 and a.cate_id=b.id limit ?, ?'
    let value = [(pagenum - 1) * pagesize, pagesize]

    if (cate_id && state) {
        sql = selectSql + ' where a.is_deleted=0 and a.cate_id=b.id and a.cate_id=? and a.state=? limit ?, ?'
        value = [cate_id, state, (pagenum - 1) * pagesize, pagesize]
    }

    if (cate_id && !state) {
        sql = selectSql + ' where a.is_deleted=0 and a.cate_id=b.id and a.cate_id=? limit ?, ?'
        value = [cate_id, (pagenum - 1) * pagesize, pagesize]
    }

    if (!cate_id && state) {
        sql = selectSql + ' where a.is_deleted=0 and a.cate_id=b.id and a.state=? limit ?, ?'
        value = [state, (pagenum - 1) * pagesize, pagesize]
    }

    db.query(sql, value, (err, results) => {
        if (err) return res.cc('sql error')
        res.send({
            status: 0,
            message: 'article list success',
            data: results
        })
    })
}

exports.deleteArticle = (req, res) => {
    db.query('update ev_articles set is_deleted=1 where id=?', [req.params.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('article delete failed')
        res.send({
            status: 0,
            message: 'article delete success',
        })
    })
}

exports.getArticleById = (req, res) => {
    db.query('select * from ev_articles where id=?', [req.params.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.length !== 1) return res.cc('article not found')
        res.send({
            status: 0,
            message: 'article get success',
            data: results[0]
        })
    })
}

exports.editArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('cover_img is required')

    const articleInfo = {
        ...req.body,
        cover_img: path.join('uploads', req.file.filename),
    }

    db.query('update ev_articles set ? where id=?', [articleInfo, req.body.id], (err, results) => {
        if (err) return res.cc('sql error')
        if (results.affectedRows !== 1) return res.cc('article edit failed')
        res.send({
            status: 0,
            message: 'article edit success',
        })
    })
}