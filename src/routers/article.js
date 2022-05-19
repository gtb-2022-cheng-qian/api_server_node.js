import express from "express"
import expressJoi from "@escook/express-joi"
import {
    add_article_schema,
    get_articles_schema,
    delete_article_schema,
    get_articlesById_schema,
    edit_article_schema
} from "../schema/article.js"
import articleController from "../controller/article.js"
import path from "path"
// 注意：使用 express.urlencoded() 中间件无法解析 multipart/form-data 格式的请求体数据。
// 当前项目，推荐使用 multer 来解析 multipart/form-data 格式的表单数据。
import multer from "multer"
import fs from "fs";

const router = express.Router()
const storage = () => {
    const date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
    const dir = path.join(path.resolve(), `./uploads/${date}`)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    return dir
}
// 创建 multer 的实例对象，通过 limits 限制上传文件的大小和单次上传最大数量.
const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 2,
        files: 1
    },
    dest: storage()
})

/*
 upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
 将文件类型的数据，解析并挂载到 req.file 属性中
 将文本类型的数据，解析并挂载到 req.body 属性中
*/
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), articleController.addArticle)
router.get('/list', expressJoi(get_articles_schema), articleController.getArticleList)
router.get('/delete/:id', expressJoi(delete_article_schema), articleController.deleteArticle)
router.get('/detail/:id', expressJoi(get_articlesById_schema), articleController.getSingleArticle)
router.post('/edit', upload.single('cover_img'), expressJoi(edit_article_schema), articleController.editArticle)

export default router