/*
 * @Author: Ali
 * @Date:   2017-03-30
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-03-30
 */

const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
	crypto = require('crypto'),
	upload = require('../module/multer');

//文章列表
router.get('/' , ( req , res ) => {
	sql("SELECT * FROM `article` order by id desc" , ( err ,articleData ) => {
		if( err ){console.log( err );return;};
		sql("select * from `article_classify`",( err , classifyData ) => {
			if( err ){console.log( err );return;};
			let data =  [articleData,classifyData];
			res.render('admin/article/list.ejs',{ data : data } );
		});
	});
});

//添加文章页
router.get('/add' , ( req , res ) => {
	sql("select * from `article_classify`",( err , data ) => {
		if( err ){console.log( err );return;};
		res.render('admin/article/add.ejs',{ data , data } );
	});
});

//发表文章
router.post('/publish' , ( req , res ) => {
	var time = new Date().toLocaleString().substring( 0 , 9 );
	const arrdata = [ req.body.title , req.body.classify , req.body.thumbnail || '',req.body.is_publish||0 , req.body.content , req.body.seo_title , req.body.seo_keywords , req.body.seo_description ,time , req.body.author ];
	let sqlSentence = " insert into `article` ( `id` , `title` , `classify` , `thumbnail` , `is_publish` , `content` , `seo_title` , `seo_keywords` , `seo_description`,`time`,`author` ) values( 0 ,?,?,?,?,?,?,?,?,?,? ) ";
	sql( sqlSentence , arrdata  , ( err , data ) => {
		if( err ){console.log(err);res.json({type : 'err',content : '操作错误'});return;};
		res.json({
			type : 'success',
			content : '发布成功'
		});
	});
});

//添加文章缩略图
router.post('/thumbnmil', upload.single('file')  , ( req , res ) => {
	let imgUrl =  'upload/user/'+req.file.filename;
	res.json({type : 'success',content : '上传成功',data: {src :  'upload/user/'+req.file.filename}});
});

//文章内容图片
router.post('/contentImg', upload.single('file')  , ( req , res ) => {
	let imgUrl =  '../../upload/user/'+req.file.filename;
	res.json({"code": 0,"msg": "","data": {"src": imgUrl,"title" : req.file.filename}});
});

//文章详情
router.get('/:id.html' , ( req , res ) => {
	sql("SELECT * FROM `article` where id=?" , [req.params.id] , ( err ,data ) => {
		if( err ){console.log( err );return;};
		if(data.length == 0){
			res.status(404).render('admin/common/404.ejs');
		}else{
			res.render('admin/article/view.ejs',{ data : data } );
		};
	});
});

//删除文章
router.post('/removeArticle' , ( req , res ) => {
	const ids = req.body.ids;
	if(typeof ids == 'string' ){//单个删除
		sql("delete from `article` where `id` = ?" , [ ids ] ,( err , data ) => {
			if( err ){console.log(err);res.json({type : 'err',content : '删除失败'});return;};
			res.json({type : 'success',content : '删除成功'});
		});
	}else {//批量删除
		for (var i = 0 ; i<ids.length ;i++ ){
			sql("delete from `article` where `id` = ?" , [ ids[i] ] ,( err , data ) => {
				if( err ){console.log(err);res.json({type : 'err',content : '删除失败'});return;};
			});
		};
		res.json({type : 'success',content : '删除成功'});
	};
});

//编辑文章页
router.get('/editArticle' , ( req , res ) => {
	sql("SELECT * FROM `article` where id = ?" , [ req.query.id ]  ,( err ,articleData ) => {
	if( err ){console.log( err );return;};
		if( articleData.length ){
			sql("select * from `article_classify`",( err , classifyData ) => {
				if( err ){console.log( err );return;};
				let data =  [articleData,classifyData];
				res.render('admin/article/edit.ejs',{ data : data } );
			});
		}else{
			res.status(404).render('admin/common/404.ejs');
		}
	});
});

//编辑文章
router.post( '/editArticle' , ( req , res ) => {
	var time = new Date().toLocaleString().substring( 0 , 9 );
	const arrdata = [ req.body.title , req.body.classify , req.body.thumbnail || '',req.body.is_publish||0 , req.body.content , req.body.seo_title , req.body.seo_keywords , req.body.seo_description ,time , req.body.author , req.body.id ];
	let sqlSentence = "update `article` set `title` = ? , `classify` = ? , `thumbnail` = ? , `is_publish` = ?  , `content` = ? , `seo_title` = ? , `seo_keywords` = ? , `seo_description` = ? ,`time` = ? ,`author` = ? where id = ?";
	sql( sqlSentence , arrdata  , ( err , data ) => {
		if( err ){console.log(err);res.json({type : 'err',content : '操作错误'});return;};
		res.json({
			type : 'success',
			content : '修改成功'
		});
	});
});

module.exports = router;