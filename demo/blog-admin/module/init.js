/*
 * @Author: Ali
 * @Date:   2017-04-1
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-04-1
 */
const express = require('express'),
    sql = require('../module/mysql'),
    navdata = require('./nav'),
    fs = require('fs');

//返回cookie
app.use( function ( req , res , next ){
    if(req.cookies.login != undefined ){
        res.locals.cookie = req.cookies.login.name;
        if( req.session.grade ){
            next();//继续往下执行，如果不调整此函数后面无法执行
        }else{
            sql( "SELECT * FROM `user` where user_name = ?" ,[req.cookies.login.name ],( err , data ) => {
                if( err ){
                    console.log(err);
                    return;
                }
                req.session.grade = Number(data[0]['grade']);
                next();//继续往下执行，如果不调整此函数后面无法执行
            });
        };
    }else{
        next();//继续往下执行，如果不调整此函数后面无法执行
    };
});

//导航数据
app.use(function (req,res,next){
    if(req.session.navdata === undefined){
        navdata( ( ondata ) => {
            req.session.navdata = ondata;
            res.locals.navdata = req.session.navdata;
            next();
         });
    }else{
        res.locals.navdata = req.session.navdata;
        next();
    }
});

//站点配置数据
app.use(function (req,res,next){
    if(req.session.configureData === undefined){
        sql( 'SELECT * FROM `configure` where id="1"' , ( err , data ) => {
            if( err ){
                console.log(err);
                return;
            }
            req.session.configureData = data;
            res.locals.configureData = req.session.configureData;
            next();//继续往下执行，如果不调整此函数后面无法执行
        });
    }else{
        res.locals.configureData = req.session.configureData;
        next();
    }
});

//模版数据
app.use(function (req,res,next){
    if(req.session.template === undefined){
        fs.stat( process.cwd()+'/views/default', ( err , data ) => {
            if( err ){
                fs.mkdirSync( process.cwd()+'/views/default');
            };
            fs.readdir( process.cwd()+'/views/default' , ( err , dirData) => {
                let tplData = {'name' : [],'info' : []};
                for( let i = 0;i<dirData.length;i++ ){
                    if( dirData[i].split('.')[dirData[i].split('.').length-1] == 'ejs' ){
                        tplData.name.push( dirData[i].split('.')[0] );
                    };
                    tplData.info.push( fs.statSync(process.cwd()+'/views/default/'+dirData[i]) );
                };
                req.session.template = tplData;
                res.locals.template = req.session.template;
                next();//继续往下执行，如果不调整此函数后面无法执行
            });
        });
    }else{
        res.locals.template = req.session.template;
        next();
    }
});
