import path from "path"
import repo from "../repository/article.js"
import articleCategoryRepo from "../repository/articleCategory.js"
import {NotFoundError, BadRequestError} from "../exception/ApplicationError.js"

const addNewArticle = (req) => {
    return articleCategoryRepo.getCategoryById(req.body.cate_id)
        .then(results => {
            if (results.length !== 1) throw new NotFoundError('cannot add the article, because no such category')

            // 手动判断是否上传了文章封面
            if (!req.file || req.file.fieldname !== 'cover_img') throw new NotFoundError('cover_img is required')

            const articleInfo = {
                ...req.body,
                cover_img: path.join('uploads', req.file.filename),
                pub_date: new Date(),
                author_id: req.user.id
            }

            return repo.insertArticle(articleInfo)
                .then((results) => {
                    if (results.affectedRows !== 1) throw new BadRequestError('article add failed')
                    return results
                })
        })
}

const getAllArticle = (req) => {
    return repo.getArticleListByPage(req)
        .then(results => {
            return repo.getArticleCountNumber(req)
                .then(count => {
                    return {
                        list: results,
                        total: count[0]['num']
                    }
                })
        })
}

const deleteArticleById = (req) => {
    return repo.markArticleAsDeletedById(req.params.id)
        .then(results => {
            if (results.affectedRows !== 1) throw new BadRequestError('article delete failed')
            return results
        })
}

const getArticleById = async (req) => {
    return repo.getArticleById(req.params.id)
        .then(results => {
            if (results.length !== 1) throw new NotFoundError('article not found')
            return results
        })
}

const editArticleById = (req) => {
    return repo.getArticleById(req.body.id)
        .then(results => {
            if (results.length !== 1) throw new NotFoundError('cannot update article, because the article is not existing')
            return articleCategoryRepo.getCategoryById(req.body.cate_id)
                .then(results => {
                    if (results.length !== 1) throw new NotFoundError('cannot update article, because no such category')

                    // 手动判断是否上传了文章封面
                    if (!req.file || req.file.fieldname !== 'cover_img') throw new NotFoundError('cover_img is required')

                    const articleInfo = {
                        ...req.body,
                        cover_img: path.join('uploads', req.file.filename),
                    }

                    return repo.updateArticleById(articleInfo, req.body.id)
                        .then(results => {
                            if (results.affectedRows !== 1) throw new BadRequestError('article edit failed')
                            return results
                        })
                })
        })
}

export default {
    addNewArticle,
    getAllArticle,
    deleteArticleById,
    getArticleById,
    editArticleById
}