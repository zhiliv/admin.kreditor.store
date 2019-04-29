'use strict';

var mysql = require('mysql2'),
	q = require('q'); //библиотека для работы с MySQL

/* создание рабочего подкючения */
var db = mysql.createPool({
	host: '80.87.203.122',
	user: 'cp447585_zhiliv',
	port: '3306',
	password: 'Zhilcoff198900',
	database: 'cp447585_test',
	//database: 'cp447585_kreditbase',
	queueLimit: 0, // unlimited queueing
	connectionLimit: 0, // unlimited connections
});

/* получение всех продуктов */
exports.Get_All_Product = () => {
	let result = q.defer();
	let sql = 'SELECT * FROM kreditproducts';
	db.query(sql, (err, rows) => {
		result.resolve(rows);
	});
	return result.promise;
};

/* получение информации о продукте */
exports.get_product_data = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM kreditproducts WHERE uid=?';
	let value = [params.uid];
	db.query(sql, value, (err, rows) => {
		let response = {err: err, data: rows[0]};
		result.resolve(response);
	});
	return result.promise;
};

/* получение всех категорий */
exports.get_all_category = () => {
  let result = q.defer();
  let sql = 'SELECT * FROM typeproduct';
  db.query(sql, (err, rows) => {
    rows.unshift({name:'-', id_category: '-'})
    result.resolve(rows);
  }) 
  return result.promise;
};
