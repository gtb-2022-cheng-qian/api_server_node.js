import path from "path"
import repo from "../repository/article.js"
import articleCategoryRepo from "../repository/articleCategory.js"

const addNewArticle = (req) => {
    return new Promise((resolve, reject) => {
        articleCategoryRepo.getCategoryById(req.body.cate_id)
            .then(results => {
                if (results.length !== 1) return reject('cannot add the article, because no such category')

                // 手动判断是否上传了文章封面
                if (!req.file || req.file.fieldname !== 'cover_img') return reject('cover_img is required')

                const articleInfo = {
                    ...req.body,
                    cover_img: path.join('uploads', req.file.filename),
                    pub_date: new Date(),
                    author_id: req.user.id
                }

                repo.insertArticle(articleInfo)
                    .then((results) => {
                        if (results.affectedRows !== 1) return reject('article add failed')
                        resolve(results)
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

const getAllArticle = (req) => {
    return new Promise((resolve, reject) => {
        // change sql query + total count
        const {pagenum, pagesize, cate_id, state} = req.query
        let selectSql = 'select a.id, a.title, a.pub_date, a.state, b.name as cate_name from ev_articles a, ev_article_cate b where a.is_deleted=0 and a.cate_id=b.id'
        let countSql = 'select count(*) as num from ev_articles a, ev_article_cate b where a.is_deleted=0 and a.cate_id=b.id'
        let value = []
        let countValue = []

        if (cate_id) {
            selectSql += ' and a.cate_id=?'
            value.push(cate_id)
            countSql += ' and a.cate_id=?'
            countValue.push(cate_id)
        }

        if (state) {
            selectSql += ' and a.state=?'
            value.push(state)
            countSql += ' and a.state=?'
            countValue.push(state)
        }

        selectSql += '  limit ?,?'
        value = value.concat([(pagenum - 1) * pagesize, pagesize])

        repo.getArticleListByPage(selectSql, value)
            .then(results => {
                repo.getArticleCountNumber(countSql, countValue)
                    .then(count => {
                        resolve({
                            list: results,
                            total: count[0]['num']
                        })
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

const deleteArticleById = (req) => {
    return new Promise((resolve, reject) => {
        repo.markArticleAsDeletedById(req.params.id)
            .then(results => {
                if (results.affectedRows !== 1) return reject('article delete failed')
                resolve(results)
            })
            .catch(err => reject(err))
    })
}

const getArticleById = async (req) => {
    return new Promise((resolve, reject) => {
        repo.getArticleById(req.params.id)
            .then(results => {
                if (results.length !== 1) return reject('article not found')
                resolve(results)
            })
            .catch(err => reject(err))
    })
}

const editArticleById = (req) => {
    return new Promise((resolve, reject) => {
        repo.getArticleById(req.body.id)
            .then(results => {
                if (results.length !== 1) return reject('cannot update article, because the article is not existing')
                articleCategoryRepo.getCategoryById(req.body.cate_id)
                    .then(results => {
                        if (results.length !== 1) return reject('cannot update article, because no such category')

                        // 手动判断是否上传了文章封面
                        if (!req.file || req.file.fieldname !== 'cover_img') return reject('cover_img is required')

                        const articleInfo = {
                            ...req.body,
                            cover_img: path.join('uploads', req.file.filename),
                        }

                        repo.updateArticleById(articleInfo, req.body.id)
                            .then(results => {
                                if (results.affectedRows !== 1) return reject('article edit failed')
                                resolve(results)
                            })
                            .catch(err => reject(err))
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

export default {
    addNewArticle,
    getAllArticle,
    deleteArticleById,
    getArticleById,
    editArticleById
}