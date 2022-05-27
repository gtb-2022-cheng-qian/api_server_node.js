import express from "express"
import expressJoi from "@escook/express-joi"
import {
    add_article_schema,
    delete_article_schema,
    edit_article_schema,
    get_articles_schema,
    get_articlesById_schema
} from "../schema/article.js"
import articleController from "../controller/article.js"
import upload from "../utils/uploadImage.js"
import {routeHandler} from "../utils/routeHandler.js"

const router = express.Router()

/*
 upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
 将文件类型的数据，解析并挂载到 req.file 属性中
 将文本类型的数据，解析并挂载到 req.body 属性中
*/
router.post('/upload/image', upload.single('cover_img'), articleController.uploadImage)
router.post('/add', expressJoi(add_article_schema), routeHandler(articleController.addArticle))
router.get('/list', expressJoi(get_articles_schema), routeHandler(articleController.getArticleList))
router.get('/delete/:id', expressJoi(delete_article_schema), routeHandler(articleController.deleteArticle))
router.get('/detail/:id', expressJoi(get_articlesById_schema), routeHandler(articleController.getSingleArticle))
router.post('/edit', upload.single('cover_img'), expressJoi(edit_article_schema), routeHandler(articleController.editArticle))

export default router