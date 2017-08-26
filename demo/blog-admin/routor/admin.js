/*
 * @Author: Ali
 * @Date:   2017-03-29
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-03-29 19:58:19
 */

const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

//用户登录
router.use( '/login' , require('./login') );

//未登录拦截
router.use(( req ,res ,next ) => {
    if(req.cookies.login == undefined ){
        res.render( 'admin/login/index.ejs' );
    }else{
        next();
    };
});

 //首页
 router.get( '/',( req , res ) => {
     res.locals.grade = req.session.grade ;
    if(req.cookies.login != undefined ){
        sql("SELECT * FROM `user` where user_name = ?" , [ req.cookies.login.name ]  ,( err ,data ) => {
            if( err ){console.log( err );return;};
            res.render( 'admin/main/index.ejs',{ data : data } );
        });
    }else{
        res.render( 'admin/login/index.ejs' );
    }
 });

//欢迎
router.get( '/welcome',( req , res ) => {
    res.render( 'admin/welcome/index.ejs' );
});

//基本设置
router.use( '/configure' , require('./configure') );

//会员管理
router.use( '/user' , require('./user') );

//文章管理
router.use( '/article' , require( './article' ) );

//内容管理
router.use('/content' , require('./content'));

//退出登录
router.get('/logout',( req,res ) => {
    res.clearCookie('login');//清楚cooke
    res.redirect('/aliadmin');//域名重定向
});


module.exports = router;