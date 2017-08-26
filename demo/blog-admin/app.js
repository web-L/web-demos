/*
 * @Author: Ali
 * @Date:   2017-03-25
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-03-25
 */

const http = require('http'),
    express = require('express'),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    sql = require('./module/mysql');

app = express();// 初始化
module.exports = app;
app.set('views',__dirname+'/views'); //设置模板引擎目录
app.use(bodyParser.json());// 用来接收json的数据
app.use(bodyParser.urlencoded( { extended:true } ));
app.use( express.static('./public') );//express.static 中间件来设置静态文件路径
app.use( cookieParser('abcdefg') );//设置cookie密钥
app.use( session({ secret:'abcdefg' }) );//密钥
require('./module/init');//初始化配置
app.use('/aliadmin',require('./routor/admin'));//后台主要路由文件入口
app.get('*', function(req, res){//404页面
    res.render('./admin/common/404.ejs');
});
http.createServer(app).listen(233);