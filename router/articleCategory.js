const express = require('express');
const router = express.Router();

const articleCategoryHandler = require('../router_handler/articleCategory.js');

const expressJoi = require('@escook/express-joi');
const {add_articleCategory_schema, delete_articleCategoryById_schema, get_articleCategoryById_schema, update_articleCategoryById_schema}=require('../schema/article.js');

// 获取所有文章分类
router.get('/category', articleCategoryHandler.getArticleCategory);

// 添加文章分类
router.post('/category/add', expressJoi(add_articleCategory_schema), articleCategoryHandler.postArticleCategory);

// 根据id删除文章分类
router.get('/category/delete/:id', expressJoi(delete_articleCategoryById_schema), articleCategoryHandler.deleteArticleCategoryById);

// 根据id获取文章分类
router.get('/category/:id', expressJoi(get_articleCategoryById_schema), articleCategoryHandler.getArticleCategoryById);

// 根据id更新文章分类
router.post('/category/update', expressJoi(update_articleCategoryById_schema), articleCategoryHandler.updateArticleCategoryById);

module.exports = router;