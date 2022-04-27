const db=require('../db/index.js');

exports.getArticleCategory=(req,res)=>{
    db.query('select * from ev_article_cate where is_deleted=0 order by id asc', (err, results) => {
        if (err) return res.cc('sql error');
        res.send({
            status: 0,
            message: 'query success',
            data: results
        })
    })
};

exports.postArticleCategory=(req, res)=>{
    db.query('select * from ev_article_cate where name=? or alias=?', [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc('sql error');
        if (results.length > 0) return res.cc('category name or alias already exists');
    })
    db.query('insert into ev_article_cate set ?', req.body, (err, results) => {
        if (err) return res.cc('sql error');
        res.send({
            status: 0,
            message: 'insert success',
        })
    })
}

exports.deleteArticleCategoryById=(req, res)=>{
    db.query('update ev_article_cate set is_deleted=1 where id=?', req.params.id, (err, results) => {
        if (err) return res.cc('sql error');
        if (results.affectedRows !== 1) return res.cc('delete failed');
        res.send({
            status: 0,
            message: 'delete success',
        })
    })
}

exports.getArticleCategoryById=(req, res)=>{
    db.query('select * from ev_article_cate where id=?', req.params.id, (err, results) => {
        if (err) return res.cc('sql error');
        if (results.length !== 1) return res.cc('category query error');
        res.send({
            status: 0,
            message: 'query success',
            data: results[0]
        })
    })
}

exports.updateArticleCategoryById=(req, res)=>{
    db.query('select * from ev_article_cate where id<>? and (name=? or alias=?)', [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc('sql error');
        if (results.length > 0) return res.cc('category name or alias already exists');
    })
    db.query('update ev_article_cate set ? where id=?', [req.body, req.body.id], (err, results) => {
        if (err) return res.cc('sql error');
        if (results.affectedRows !== 1) return res.cc('update failed');
        res.send({
            status: 0,
            message: 'update success',
        })
    })
}