/*
 * @Author: Ali
 * @Date:   2017-04-11
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-04-11
 */

const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
	crypto = require('crypto'),
	upload = require('../module/multer'),
	fs = require('fs');

//导航列表
router.get('/navlist' , ( req , res ) => {
	res.render('admin/content/index.ejs');
});

//编辑导航
router.route('/nav/edit')
	.get( ( req , res ) => {
		sql( "select * from `nav` where id=?" , [ req.query.id ] , ( err , data ) => {
			if( err ){
				console.log(err);
				return;
			};
			if( data.length != 0 ){
				res.render('admin/content/nav/edit.ejs',{ 'navdata' : data });
			}else{
				res.render('./admin/common/404.ejs');
			}

		});
	})
	.post( ( req , res ) => {
		let data = req.body;
		sql( "update `nav` set title = ?,url = ?,serial_number = ?,is_show = ? where id = ?" , [ data.title,data.url,data.serial_number,data.is_show||0,data.id] , ( err , data ) => {
			if( err ){
				console.log(err);
				return;
			};
			delete req.session.navdata;
			res.json({
				type : 'success',
				content : '修改成功'
			});
		});
	});

//添加导航
router.route('/nav/add')
	.get( ( req , res ) => {
		res.render('admin/content/nav/add.ejs');
	})
	.post( ( req , res ) => {
		let data = req.body;

		function  addNav( navData ){
			sql( 'insert into `nav` (`id`,`navid`,`leve`,`label`,`title`,`url`,`serial_number`,`is_show`) values(0,?,?,?,?,?,?,?)' , navData ,( err , data ) => {
				if( err ){console.log(err);res.json({type : 'err',content : '添加失败'});return;};
				delete req.session.navdata;
				res.json({type : 'success',content : '添加成功'});
			});
		};

		if( data.navid == undefined ){//添加一级导航
			sql( 'SELECT * from `nav` WHERE leve="1"' , ( err , oneData ) => {
				if( err ){console.log(err);return;};
				addNav( [oneData.length+1,data.leve,'top',data.title,data.url,data.serial_number,data.is_show||0] );
			});
		}else{//添加二级导航
			addNav( [data.navid,data.leve,'top',data.title,data.url,data.serial_number,data.is_show||0] );
		};

	});

//删除导航
router.post('/nav/remove' , ( req , res ) => {
	const ids = req.body.ids;
	for (var i = 0 ; i<ids.length ;i++ ){
		sql("delete from `nav` where `id` = ?" , [ ids[i] ] ,( err , data ) => {
			if( err ){console.log(err);res.json({type : 'err',content : '删除失败'});return;};
		});
	};
	delete req.session.navdata;
	res.json({type : 'success',content : '删除成功'});
});

//模版管理
router.get('/template',( req , res ) => {
	res.render('admin/content/template/list.ejs');
});

//编辑模版
router.route('/template/edit')
	.get(( req , res ) => {
		res.render('admin/content/template/edit.ejs',{ content: fs.readFileSync( process.cwd()+'/views/default/'+req.query.name+'.ejs','utf-8'),'title': req.query.name });
	})
	.post(( req , res ) => {
		fs.writeFile( process.cwd()+'/views/default/'+req.body.title+'.ejs' , req.body.content  , (err , data) => {
			if( err ){console.log(err);res.json({type : 'err',content : '修改失败'});return;};
			res.json({type : 'success',content : '修改成功'});
		});
	});


module.exports = router;