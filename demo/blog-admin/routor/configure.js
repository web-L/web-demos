/*
 * @Author: Ali
 * @Date:   2017-04-16
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-04-16
 */

const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.route('/edit')
	.get( ( req , res ) => {
		res.render('admin/configure/index.ejs');
	})
	.post( ( req , res ) => {
		const data = req.body;
		sql( 'update `configure` set `title`=?,`copyright`=?,`keyword`=?,`describe`=?,`record_number`=? where id="1"',[ data.title,data.copyright,data.keyword,data.describe,data.record_number ],( err , data ) => {
			if( err ){console.log(err);res.json({type : 'err',content : '修改失败'});return;};
			delete req.session.configureData;
			res.json({type : 'success',content : '修改成功'});
		});
	});

module.exports = router;