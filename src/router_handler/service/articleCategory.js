const articleCategory = require('../repository/articleCategory.js');

exports.getArticleCategory = async (req, res) => {
    const results = await articleCategory.getCategoryList(req, res);

    res.send({
        status: 0,
        message: 'query success',
        data: results
    })
};

exports.postArticleCategory = (req, res) => {
    articleCategory.getCategoryByNameOrAlias(req, res)
    articleCategory.addCategory(req, res)

    res.send({
        status: 0,
        message: 'insert success',
    })
}

exports.deleteArticleCategoryById = (req, res) => {
    articleCategory.markCategoryDeleted(req, res)

    res.send({
        status: 0,
        message: 'delete success',
    })
}

exports.getArticleCategoryById = async (req, res) => {
    const result = await articleCategory.getCategoryById(req, res);

    res.send({
        status: 0,
        message: 'query success',
        data: result
    })
}

exports.updateArticleCategoryById = (req, res) => {
    articleCategory.getCategoryByNameOrAliasExceptId(req, res)
    articleCategory.updateCategoryById(req, res)

    res.send({
        status: 0,
        message: 'update success',
    })
}