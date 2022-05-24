import db from "../../db/index.js"
import {DatabaseError} from "../exception/ApplicationError.js";

const promisify = (sql, value) => {
    return new Promise((resolve, reject) => {
        db.query(sql, value, (err, results) => {
            if (err) return reject('sql error')
            resolve(results)
        })
    }).catch(err => {
        throw new DatabaseError(err)
    })
}

export default promisify