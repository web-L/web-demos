/*
 * @Author: Ali
 * @Date:   2017-04-5
 * @Last Modified by:   Ali
 * @Last Modified time: 2017-04-5
 */

const sql = require('../module/mysql');

let fn = function (onedata,i){
    return new Promise(function (resolve,reject){
        sql('SELECT * FROM `nav` where leve = 2 and navid = ?',[onedata[i]['navid']],(err,towdata) => {
            onedata[i].towdata = towdata;
            resolve()
        });
    })
};
module.exports = function (cb){
    sql('SELECT * FROM `nav` where leve = 1 and label = "top" ',(err,onedata) => {
        let arr = [];
        for(let i in onedata){
            arr[i] = fn(onedata,i);
        };
        Promise.all(arr).then(function (){
            cb(onedata);
        });
    });
};
