import path from "path"
import repo from "../repository/article.js"

const addNewArticle = (req) => {
    return new Promise((resolve, reject) => {
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
}

const getAllArticle = (req) => {
    return new Promise((resolve, reject) => {
        const {pagenum, pagesize, cate_id, state} = req.query
        const selectSql = 'select a.id, a.title, a.pub_date, a.state, b.name as cate_name from ev_articles a, ev_article_cate b'
        let sql = selectSql + ' where a.is_deleted=0 and a.cate_id=b.id limit ?, ?'
        let value = [(pagenum - 1) * pagesize, pagesize]

        if (cate_id && state) {
            sql = selectSql + ' where a.is_deleted=0 and a.cate_id=b.id and a.cate_id=? and a.state=? limit ?, ?'
            value = [cate_id, state, (pagenum - 1) * pagesize, pagesize]
        }

        if (cate_id && !state) {
            sql = selectSql + ' where a.is_deleted=0 and a.cate_id=b.id and a.cate_id=? limit ?, ?'
            value = [cate_id, (pagenum - 1) * pagesize, pagesize]
        }

        if (!cate_id && state) {
            sql = selectSql + ' where a.is_deleted=0 and a.cate_id=b.id and a.state=? limit ?, ?'
            value = [state, (pagenum - 1) * pagesize, pagesize]
        }

        repo.getArticleListByPage(sql, value)
            .then(results => resolve(results))
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
}

export default {
    addNewArticle,
    getAllArticle,
    deleteArticleById,
    getArticleById,
    editArticleById
}