import repo from '../repository/articleCategory.js'

const getCategoryList = () => {
    return new Promise((resolve, reject) => {
        repo.getAllCategories()
            .then(results => resolve(results))
            .catch(err => reject(err))
    })
}

const addArticleCategory = (req) => {
    return new Promise((resolve, reject) => {
        // 同步bug
        repo.getCategoryByNameOrAlias(req.body.name, req.body.alias)
            .then(results => {
                // 使用version做版本控制 设为uq
                // db.getConnection().beginTransaction(err => {})
                if (results.length > 0) return reject('category name or alias already exists')
                repo.insertCategory(req.body)
                    .then(results => {
                        if (results.affectedRows !== 1) return reject('insert failed')
                        resolve(results)
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

const deleteArticleCategory = (req) => {
    return new Promise((resolve, reject) => {
        repo.markCategoryDeletedById(req.params.id)
            .then(results => {
                if (results.affectedRows !== 1) return reject('delete failed')
                resolve(results)
            })
            .catch(err => reject(err))
    })
}

const getArticleCategory = (req) => {
    return new Promise((resolve, reject) => {
        repo.getCategoryById(req.params.id)
            .then(results => {
                if (results.length !== 1) return reject('category query error')
                resolve(results[0])
            })
            .catch(err => reject(err))
    })
}

const updateArticleCategory = (req) => {
    return new Promise((resolve, reject) => {
        repo.getCategoryById(req.body.id)
            .then(results => {
                if (results.length !== 1) return reject('cannot update category, because no such category')
                repo.getCategoryByNameOrAliasExceptId(req.body.id, req.body.name, req.body.alias)
                    .then(results => {
                        if (results.length > 0) return reject('category name or alias already exists')
                        repo.updateCategoryById(req.body, req.body.id)
                            .then(results => {
                                if (results.affectedRows !== 1) return reject('update failed')
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
    getCategoryList,
    addArticleCategory,
    deleteArticleCategory,
    getArticleCategory,
    updateArticleCategory
}