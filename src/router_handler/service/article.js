const path = require('path');
const article = require('../repository/article.js');

exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('cover_img is required')

    const articleInfo = {
        ...req.body,
        cover_img: path.join('uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }

    article.insertArticle(req, res, articleInfo)

    res.send({
        status: 0,
        message: 'article add success',
    })
}

exports.getArticleList = async (req, res) => {
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

    const results = await article.getArticleListByPage(req, res, sql, value);

    res.send({
        status: 0,
        message: 'article list success',
        data: results
    })
}

exports.deleteArticle = (req, res) => {
    article.markArticleAsDeleted(req, res)

    res.send({
        status: 0,
        message: 'article delete success',
    })
}

exports.getArticleById = async (req, res) => {
    const result = await article.getArticleById(req, res);

    res.send({
        status: 0,
        message: 'article get success',
        data: result
    })
}

exports.editArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('cover_img is required')

    const articleInfo = {
        ...req.body,
        cover_img: path.join('uploads', req.file.filename),
    }

    article.updateArticleById(req, res, articleInfo)

    res.send({
        status: 0,
        message: 'article edit success',
    })
}