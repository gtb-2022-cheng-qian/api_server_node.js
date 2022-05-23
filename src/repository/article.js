import promisify from "../utils/promise.js"

const insertArticle = (articleInfo) => {
    return promisify('insert into ev_articles set ?', [articleInfo])
}

const optimizeSqlByCateIdAndState = (cate_id, state, sql, value) => {
    if (cate_id) {
        sql += ' and a.cate_id=?'
        value.push(cate_id)
    }

    if (state) {
        sql += ' and a.state=?'
        value.push(state)
    }
    return sql
}

const getArticleListByPage = (req) => {
    const {pagenum, pagesize, cate_id, state} = req.query
    let selectSql = 'select a.id, a.title, a.pub_date, a.state, b.name as cate_name from ev_articles a, ev_article_cate b where a.is_deleted=0 and a.cate_id=b.id'
    let value = []

    selectSql = optimizeSqlByCateIdAndState(cate_id, state, selectSql, value)
    selectSql += ' limit ?,?'
    value = value.concat([(pagenum - 1) * pagesize, pagesize])

    return promisify(selectSql, value)
}

const getArticleCountNumber = (req) => {
    const {cate_id, state} = req.query
    // count(*)和count(1)的区别：count(*)是查询数据库中的总记录数，count(1)是查询表中的总记录数
    let countSql = 'select count(1) as num from ev_articles a, ev_article_cate b where a.is_deleted=0 and a.cate_id=b.id'
    let countValue = []

    countSql = optimizeSqlByCateIdAndState(cate_id, state, countSql, countValue)

    return promisify(countSql, countValue)
}

const markArticleAsDeletedById = (id) => {
    return promisify('update ev_articles set is_deleted = 1 where id = ?', [id])
}

const getArticleById = (id) => {
    return promisify('select * from ev_articles where is_deleted = 0 and id = ?', [id])
}

const updateArticleById = (articleInfo, id) => {
    return promisify('update ev_articles set ? where id = ?', [articleInfo, id])
}

export default {
    insertArticle,
    getArticleListByPage,
    markArticleAsDeletedById,
    getArticleById,
    updateArticleById,
    getArticleCountNumber
}