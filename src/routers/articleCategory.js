import express from "express"
import expressJoi from "@escook/express-joi"
import {
    add_articleCategory_schema,
    delete_articleCategoryById_schema,
    get_articleCategoryById_schema,
    update_articleCategoryById_schema
} from "../schema/articleCategory.js"
import articleCategoryController from "../controller/articleCategory.js"

const router = express.Router()

// 获取所有文章分类
router.get('/list', articleCategoryController.getArticleCategory)
// 添加文章分类
router.post('/add', expressJoi(add_articleCategory_schema), articleCategoryController.postArticleCategory)
// 根据id删除文章分类
router.get('/delete/:id', expressJoi(delete_articleCategoryById_schema), articleCategoryController.deleteArticleCategoryById)
// 根据id获取文章分类
router.get('/:id', expressJoi(get_articleCategoryById_schema), articleCategoryController.getArticleCategoryById)
// 根据id更新文章分类
router.post('/update', expressJoi(update_articleCategoryById_schema), articleCategoryController.updateArticleCategoryById)

export default router