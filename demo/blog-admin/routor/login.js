/*
 * @Author: Ali
 * @Date:   2017-03-29
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-03-29
 */

const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
	crypto = require('crypto');

router.get('/' , ( req , res ) => {
	res.render('admin/login/index.ejs');
});

router.post('/', (req , res ) => {
	const user = req.body['userName'],
		pass = req.body['password'],
		time = new Date().toLocaleString();
	sql("SELECT * FROM `user` where user_name = ?" , [ user ]  ,( err ,data ) => {
		// 已经由前端加密了 md5 = crypto.createHash('md5');
		if( err ){
			console.log( err );
			return;
		}
		if( data.length ){
			// 已经由前端加密了 let newpass = md5.update(pass).digest('hex');
			if( data[0].user_name == user && data[0].pass == pass ){
				//保存登录状态 cookie 1、cookie名称 : '' 2、保存的数据 {  } 3、过期时间 { maxAge : }
				res.cookie( 'login' , { 'name' : user } , { maxAge : 1000*60*60*3 } );
				//保存管理员状态 保存在服务器里，session 关闭页面时，session下保存的所有的数据都会清空
				req.session.grade = Number( data[0]['grade'] );
				sql( "update `user` set login_date = ?,ip = ? where user_name = ?",[ time , req.ip , user ] , ( err , date ) => {
					if( err ){ console.log(err);return; };
					res.json({
						id : data[0].id,
						type : 'success',
						content:'登录成功'
					})
				});
			}else{
				res.json({
					type : 'err',
					content:'密码错误！'
				})
			}
		}else{
			res.json({
				type : 'err',
				content:'帐号不存在'
			})
		}
	});
});
	
module.exports = router;