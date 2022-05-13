const express = require('express');
const articleController = require('../router_handler/controller/article.js');
const expressJoi = require('@escook/express-joi');
const {
    add_article_schema,
    get_articles_schema,
    delete_article_schema,
    get_articlesById_schema,
    edit_article_schema
} = require('../schema/article.js');
// 注意：使用 express.urlencoded() 中间件无法解析 multipart/form-data 格式的请求体数据。
// 当前项目，推荐使用 multer 来解析 multipart/form-data 格式的表单数据。
const multer = require('multer');
const path = require('path');

const router = express.Router();
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({dest: path.join(__dirname, '../uploads')})

/*
 发布新文章的路由
 upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
 将文件类型的数据，解析并挂载到 req.file 属性中
 将文本类型的数据，解析并挂载到 req.body 属性中
*/
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), articleController.addArticle)

router.get('/list', expressJoi(get_articles_schema), articleController.getArticleList)

router.get('/delete/:id', expressJoi(delete_article_schema), articleController.deleteArticle)

router.get('/detail/:id', expressJoi(get_articlesById_schema), articleController.getSingleArticle)

router.post('/edit', upload.single('cover_img'), expressJoi(edit_article_schema), articleController.editArticle)

module.exports = router;