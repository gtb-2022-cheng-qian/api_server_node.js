const path = require('path');
const db = require('../db/index.js');

exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('cover_img is required');

    const articleInfo = {
        ...req.body,
        cover_img: path.join('uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }

    db.query('insert into ev_articles set ?', articleInfo, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('article add failed');
        res.send({
            status: 0,
            message: 'article add success',
        })
    })
}