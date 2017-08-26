/*
 * @Author: Ali
 * @Date:   2017-03-30
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-03-29
 */

const mysql  = require('mysql');

module.exports = function( sql , zhi , callback){

	const config = mysql.createConnection({     
		  host     : 'localhost',  //主机地址
		  user     : 'root',              
		  password : '',
		  port: '3306',                   
		  database: 'node_admin'
	}); 
	
		config.connect();//开始链接
		
		config.query( sql , zhi ,( err , data ) => {
			callback && callback( err , data );
		});
		
		config.end();//结束链接
		
}
