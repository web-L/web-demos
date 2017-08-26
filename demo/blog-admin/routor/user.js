/*
 * @Author: Ali
 * @Date:   2017-03-29
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-03-29
 */

const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
	crypto = require('crypto'),
	upload = require('../module/multer');

//个人中心页
router.get('/' , ( req , res ) => {
	sql("SELECT * FROM `user` where user_name = ?" , [ req.cookies.login.name ]  ,( err ,data ) => {
		if( err ){console.log( err );return;};
		res.render('admin/user/index.ejs',{ data : data } );
	});
});

//个人资料页
router.get('/edit' , ( req , res ) => {
	sql("SELECT * FROM `user` where user_name = ?" , [ req.cookies.login.name ]  ,( err ,data ) => {
		if( err ){console.log( err );return;};
		res.render('admin/user/edit.ejs',{ data : data } );
	});
});

//修改资料（用户名和邮箱）
router.post( '/update' , ( req , res ) => {
	const email = req.body.email,
		   nickname = req.body.nickname,
		   id = req.body.id;
	sql( "update `user` set `e_mail` = ? ,nickname = ? where id = ? " , [ email ,nickname ,id ] , ( err , data ) => {
		if( err ){
			res.json({type : 'err',content : '操作错误'});
			return;
		};
		res.json({
			type : 'success',
			content : '修改成功'
		});
	});
});

//修改密码
router.post( '/repass', ( req , res ) => {
	const pass = req.body.pass,
	repass = req.body.repass,
	id = req.body.id;
	sql( "update `user` set `pass` = ? where id = ? " , [ repass ,id ] , ( err , data ) => {
		if( err ){
			console.log(err)
			res.json({type : 'err',content : '操作错误'});
			return;
		};
		res.json({
			type : 'success',
			content : '修改成功',
			data : true
		});
	});
});

//头像上传
router.post('/uphead', upload.single('file')  , ( req , res ) => {
	let imgUrl =  'upload/user/'+req.file.filename;
	sql( "SELECT * FROM `user` where user_name = ?" ,[req.cookies.login.name ],( err , data ) => {
		if( err ){ console.log(err); return; };
		sql("update `user` set `head` = ? where `id` = ? " , [imgUrl ,data[0].id ] ,( err , data ) => {
			if( err ){ console.log(err); res.json({type : 'err',content : '上传失败'});return; };
			res.json({type : 'success',content : '上传成功',data: {src :  'upload/user/'+req.file.filename}});
		})
	});
});

//会员列表页
router.get('/list' , ( req , res ) => {
	sql("SELECT * FROM `user` where user_name != ?",[req.cookies.login.name ] ,( err ,data ) => {
	if( err ){console.log( err );return;};
	res.render('admin/user/list.ejs',{ data : data } );
});
});

//添加会员页
router.get('/add' , ( req , res ) => {
	res.render('admin/user/add.ejs');
});

//添加头像
router.post('/add/adduphead', upload.single('file')  , ( req , res ) => {
	let imgUrl =  'upload/user/'+req.file.filename;
	res.json({type : 'success',content : '上传成功',data: {src :  'upload/user/'+req.file.filename}});
});

//添加会员
router.post('/adduser',( req , res ) => {
	const user = req.body.username,
		email = req.body.email,
		repass = req.body.repass,
		nickname = req.body.nickname,
		grade = req.body.grade,
		filename = req.body.filename,
		time = new Date().toLocaleString();

	sql( "SELECT * FROM `user` where user_name = ?" , [ user ] , ( err , dada ) => {
		if( err ){console.log(err);res.json({type : 'err',content : '操作错误'});return;};
		if( dada.length ){
			res.json({type : 'err',content : '用户名已经存在'});
		}else{
			//let newpass = md5.update(pass).digest('hex');
			let arr = [ user , email ,nickname ,repass ,grade ,filename,time ];
			sql( "insert into `user` ( id , user_name , e_mail , nickname , pass ,grade , head , create_time ) values( 0,?,?,?,?,?,?,? )", arr  , ( err , data ) => {
				if( err ){console.log(err);res.json({type : 'err',content : '提交失败'});return;};
				res.json({type : 'success',content : '添加成功'});
			})
		}
	});
});

//会员资料
router.get('/edituser' , ( req , res ) => {
	sql("SELECT * FROM `user` where id = ?" , [ req.query.id ]  ,( err ,data ) => {
		if( err ){console.log( err );return;};
		if( data.length ){
			res.render('admin/user/user_edit.ejs',{ data : data } );
		}else{
			res.status(404).render('admin/common/404.ejs');
		}
	});
});

//编辑会员资料
router.post( '/edituser' , ( req , res ) => {
	const user = req.body.username,
	email = req.body.email,
	repass = req.body.repass,
	nickname = req.body.nickname,
	grade = req.body.grade;
	filename = req.body.filename,
	id = req.body.id;
	let sqlSentence = "update `user` set `user_name` = ? ,e_mail = ? , pass = ? , nickname = ? ,grade = ? , head = ? where id = ? "
	sql( sqlSentence , [ user ,email , repass , nickname , grade , filename , id ] , ( err , data ) => {
		if( err ){
			res.json({type : 'err',content : '操作错误'});
			console.log(err);
			return;
		};
		res.json({
			type : 'success',
			content : '修改成功'
		});
	});
});

//查看资料
router.get('/userview' , ( req , res ) => {
	sql("SELECT * FROM `user` where id = ?" , [ req.query.id ]  ,( err ,data ) => {
		if( err ){console.log( err );return;};
		if( data.length ){
			res.render('admin/user/user_view.ejs',{ data : data } );
		}else{
			res.status(404).render('admin/common/404.ejs');
		}
	});
});

//删除会员
router.post('/removeuser' , ( req , res ) => {
	const ids = req.body.ids;
	if(typeof ids == 'string' ){//单个删除
		sql("delete from `user` where `id` = ?" , [ ids ] ,( err , data ) => {
			if( err ){console.log(err);res.json({type : 'err',content : '删除失败'});return;};
			res.json({type : 'success',content : '删除成功'});
		});
	}else {//批量删除
		for (var i = 0 ; i<ids.length ;i++ ){
			sql("delete from `user` where `id` = ?" , [ ids[i] ] ,( err , data ) => {
				if( err ){console.log(err);res.json({type : 'err',content : '删除失败'});return;};
			});
		};
		res.json({type : 'success',content : '删除成功'});
	};
});

module.exports = router;