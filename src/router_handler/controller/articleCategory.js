const service = require('../service/articleCategory.js');

exports.getArticleCategory = (req, res) => {
    service.getCategoryList()
        .then(results => {
            res.send({
                status: 0,
                message: 'query success',
                data: results
            })
        })
        .catch(err => res.cc(err));
};

exports.postArticleCategory = (req, res) => {
    service.addArticleCategory(req)
        .then(results => {
            if (results.affectedRows === 1) {
                res.send({
                    status: 0,
                    message: 'insert success',
                })
            }
        })
        .catch(err => res.cc(err));
}

exports.deleteArticleCategoryById = (req, res) => {
    service.deleteArticleCategory(req)
        .then(results => {
            if (results.affectedRows === 1) {
                res.send({
                    status: 0,
                    message: 'delete success',
                })
            }
        })
        .catch(err => res.cc(err));
}

exports.getArticleCategoryById = (req, res) => {
    service.getArticleCategory(req)
        .then(result => {
            res.send({
                status: 0,
                message: 'query success',
                data: result
            })
        })
        .catch(err => res.cc(err));
}

exports.updateArticleCategoryById = (req, res) => {
    service.updateArticleCategory(req)
        .then(result => {
            if (result.affectedRows === 1) {
                res.send({
                    status: 0,
                    message: 'update success',
                })
            }
        })
        .catch(err => res.cc(err))
}