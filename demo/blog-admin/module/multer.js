/*
 * @Author: Ali
 * @Date:   2017-03-30
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-03-29
 */

const multer = require('multer'),
    path = require('path');

//  上传路径处理 上传之后重命名
let storage = multer.diskStorage({

    destination: path.join(process.cwd(),'public/upload/user'), // 上传路径
    filename:function (req,file,callback){
        let filename = (file.originalname).split(".");
        callback(null, `${Date.now()}.${filename[filename.length-1]}` )
    }
});
// 图片格式过虑
//let fileFilter = function (req,file,cb){
//    // 当设置这个判断后  没允许的 && 没设置的类型 拒绝
//    if(file.mimetype === 'image/gif'){
//        cb(null,true)
//    }else{
//        req.upload = '不';
//        cb(null,false)
//    }
//};


let upload = multer({
    storage:storage,
    limits:{}
    //fileFilter:fileFilter 图片格式过虑
});

module.exports = upload;