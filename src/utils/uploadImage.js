import path from "path"
import fs from "fs"
// 注意：使用 express.urlencoded() 中间件无法解析 multipart/form-data 格式的请求体数据。
// 当前项目，推荐使用 multer 来解析 multipart/form-data 格式的表单数据。
import multer from "multer"

function CreateDate() {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let day = new Date().getDate()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    return year + "-" + month + "-" + day;
}

const storage = () => {
    const date = CreateDate();
    const dir = path.join(path.resolve(), `./uploads/${date}`)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    return dir
}
// 创建 multer 的实例对象，通过 limits 限制上传文件的大小和单次上传最大数量, dest 定义上传文件的目录
const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 2,
        files: 1
    },
    dest: storage()
})

export default upload