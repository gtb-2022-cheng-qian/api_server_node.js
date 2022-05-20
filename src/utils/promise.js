import db from "../../db/index.js"

const promisify = (sql, value) => {
    return new Promise((resolve, reject) => {
        db.query(sql, value, (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}

export default promisify