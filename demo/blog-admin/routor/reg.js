//const express = require('express'),
//    router = express.Router(),
//    sql = require('../module/mysql'),
//	crypto = require('crypto');
//
//
//router.get('/' , ( req , res ) => {
//	res.render('reg.ejs');
//});
//
//router.post('/' , ( req , res ) => {
//	const user = req.body.username,
//		pass = req.body.pass,
//		md5 = crypto.createHash('md5');
//	//创建查询  where 查询条件
//
//	sql( "SELECT * FROM `user` where name = ?" , [ user ] , ( err , dada ) => {
//		//if( err ) console.log(  err ); return;
//		if( dada.length ){
//			res.locals.err = '<h2>用户名已经存在</h2>';//向模版传递参数
//			res.render( 'reg.ejs');
//		}else{
//			//md5 加密 编码格式是hex
//			let newpass = md5.update(pass).digest('hex');
//			sql( 'insert into user ( id , name , pass ,is_admin ) values( 0,? ,?,false )', [ user , newpass ] , ( err , data ) => {
//				if(err){
//					console.log(err)
//					return
//				}
//				res.locals.result = '<h2>注册成功！</h2>';
//				res.render('reg.ejs')
//			})
//		}
//	});
//});
//
////let pass = 'admin';
////md5 = crypto.createHash('md5');
////let newpass = md5.update(pass).digest('hex');
////sql( "insert into user ( id , user_name , pass ,grade ) values( 0,? ,?,false )", [ 'admin' , newpass , 1 ] , ( err , data ) => {
////	if(err){
////		console.log(err)
////		return
////	}
////	console.log(data)
////})
//
//module.exports = router;