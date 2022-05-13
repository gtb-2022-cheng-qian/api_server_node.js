const db = require("../../../db/index.js");

exports.getPromise = (sql, value) => {
    return new Promise((resolve, reject) => {
        db.query(sql, value, (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    })
}