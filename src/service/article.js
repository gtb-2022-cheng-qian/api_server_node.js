import repo from '../repository/article.js'
import articleCategoryRepo from '../repository/articleCategory.js'
import {BadRequestError, NotFoundError} from '../exception/ApplicationError.js'
import config from '../../config.js'

const postImage = (req) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') throw new NotFoundError('cover_img is required', 'conflict')
    return 'http://' + config.hostname + ':' + config.port + '/api/article/image/' + req.file.path.split(/(\d{4}-\d{2}-\d{2}.*)/)[1]
}

const addNewArticle = (req) => {
    return articleCategoryRepo.getCategoryById(req.body.cate_id)
        .then(results => {
            if (results.length !== 1) throw new NotFoundError('cannot add the article, because no such category')

            const articleInfo = {
                ...req.body,
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
    const {pagenum, pagesize, cate_id, state} = req.query
    return repo.getArticleListByPage(pagenum, pagesize, cate_id, state)
        .then(results => {
            return repo.getArticleCountNumber(cate_id, state)
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
                    return repo.updateArticleById(req.body, req.body.id)
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
    editArticleById,
    postImage
}