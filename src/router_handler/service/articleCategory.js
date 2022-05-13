const repo = require('../repository/articleCategory.js');

exports.getCategoryList = () => {
    return new Promise((resolve, reject) => {
        repo.getAllCategories()
            .then(results => {
                resolve(results)
            })
            .catch(err => reject(err))
    })
};

exports.addArticleCategory = (req) => {
    return new Promise((resolve, reject) => {
        repo.getCategoryByNameOrAlias(req.body.name, req.body.alias)
            .then(results => {
                if (results.length > 0) return reject('category name or alias already exists');
            })
            .catch(err => reject(err))

        repo.insertCategory(req.body)
            .then(results => {
                if (results.affectedRows !== 1) return reject('insert failed');
                resolve(results)
            })
            .catch(err => reject(err))
    })
}

exports.deleteArticleCategory = (req) => {
    return new Promise((resolve, reject) => {
        repo.markCategoryDeletedById(req.params.id)
            .then(results => {
                if (results.affectedRows !== 1) return reject('delete failed')
                resolve(results)
            })
            .catch(err => reject(err))
    })
}

exports.getArticleCategory = (req) => {
    return new Promise((resolve, reject) => {
        repo.getCategoryById(req.params.id)
            .then(results => {
                if (results.length !== 1) return reject('category query error');
                resolve(results[0])
            })
            .catch(err => reject(err))
    })
}

exports.updateArticleCategory = (req) => {
    return new Promise((resolve, reject) => {
        repo.getCategoryByNameOrAliasExceptId(req.body.id, req.body.name, req.body.alias)
            .then(results => {
                if (results.length > 0) return reject('category name or alias already exists');
            })
            .catch(err => reject(err))
        repo.updateCategoryById(req.body, req.body.id)
            .then(results => {
                if (results.affectedRows !== 1) return reject('update failed');
                resolve(results)
            })
            .catch(err => reject(err))
    })
}