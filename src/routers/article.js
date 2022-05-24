import express from "express"
import expressJoi from "@escook/express-joi"
import {
    add_article_schema,
    delete_article_schema,
    edit_article_schema,
    get_articles_schema,
    get_articlesById_schema
} from "../schema/article.js"
import {addArticle, editArticle, getSingleArticle, getArticleList, deleteArticle} from "../controller/article.js"
import upload from "../utils/uploadImage.js"

const router = express.Router()

function controller(handler) {
    return (req, res, next) => handler(req, res).catch(next);
}

/*
 upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
 将文件类型的数据，解析并挂载到 req.file 属性中
 将文本类型的数据，解析并挂载到 req.body 属性中
*/
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), controller(addArticle))
router.get('/list', expressJoi(get_articles_schema), controller(getArticleList))
router.get('/delete/:id', expressJoi(delete_article_schema), controller(deleteArticle))
router.get('/detail/:id', expressJoi(get_articlesById_schema), controller(getSingleArticle))
router.post('/edit', upload.single('cover_img'), expressJoi(edit_article_schema), controller(editArticle))

export default router