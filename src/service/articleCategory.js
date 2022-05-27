import repo from '../repository/articleCategory.js'
import articleRepo from '../repository/article.js'
import {BadRequestError, ConflictError, NotFoundError} from '../exception/ApplicationError.js'

const getCategoryList = () => {
    return repo.getAllCategories()
        .then(results => results)
}

const addArticleCategory = (req) => {
    return repo.getCategoryByNameOrAlias(req.body.name, req.body.alias)
        .then(results => {
            // 使用version做版本控制 设为uq
            // db.getConnection().beginTransaction(err => {})
            if (results.length > 0) throw new ConflictError('category name or alias already exists')
            return repo.insertCategory(req.body)
                .then(results => {
                    if (results.affectedRows !== 1) throw new BadRequestError('insert failed')
                    return results
                })
        })
}

const deleteArticleCategory = (req) => {
    return articleRepo.getArticleCountNumber(req.params.id, undefined)
        .then(count=>{
            if (count[0]['num']>0) throw new ConflictError('cannot delete a category with books')
            return repo.markCategoryDeletedById(req.params.id)
                .then(results => {
                    if (results.affectedRows !== 1) throw new BadRequestError('delete failed')
                    return results
                })
        })
}

const getArticleCategory = (req) => {
    return repo.getCategoryById(req.params.id)
        .then(results => {
            if (results.length !== 1) throw new NotFoundError('category is not found')
            return results[0]
        })
}

const updateArticleCategory = (req) => {
    return repo.getCategoryById(req.body.id)
        .then(results => {
            if (results.length !== 1) throw new NotFoundError('cannot update category, because the category is not existing')
            return repo.getCategoryByNameOrAliasExceptId(req.body.id, req.body.name, req.body.alias)
                .then(results => {
                    if (results.length > 0) throw new ConflictError('category name or alias already exists')
                    return repo.updateCategoryById(req.body, req.body.id)
                        .then(results => {
                            if (results.affectedRows !== 1) throw new BadRequestError('update failed')
                            return results
                        })
                })
        })
}

export default {
    getCategoryList,
    addArticleCategory,
    deleteArticleCategory,
    getArticleCategory,
    updateArticleCategory
}