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
	let sql = 'SELECT * FROM kredit_products';
	db.query(sql, (err, rows) => {
		result.resolve(rows);
	});
	return result.promise;
};

/* получение информации о продукте */
exports.get_product_data = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM kredit_products WHERE uid=?';
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
  let sql = 'SELECT * FROM type_product';
  db.query(sql, (err, rows) => {
    rows.unshift({name:'-', id_category: '-'})
    result.resolve(rows);
  }) 
  return result.promise;
};

/* получение периодов */
exports.get_all_periods = () => {
  let result = q.defer();
  let sql = 'SELECT * FROM type_period';
  db.query(sql, (err, rows) => {
    rows.unshift({name:'-'})
    result.resolve(rows);
  })
  return result.promise;
}

/* получение всех партнерских программ */
exports.get_all_cpa = () => {
  let result = q.defer();
  let sql = 'SELECT * FROM cpa';
  db.query(sql, (err, rows) => {
    rows.unshift({name:'-'})
    result.resolve(rows)
  })
  return result.promise;
}

/* получение всех организаций */
exports.get_all_organization = () => {
  let result = q.defer();
  let sql = 'SELECT * FROM organizations';
  db.query(sql, (err, rows) => {
    rows.unshift({name:'-'})
    result.resolve(rows)
  })
  return result.promise;
}

/* получение всех документов */
exports.get_all_dosc = () =>{
  let result = q.defer();
  let sql = 'SELECT * FROM docs';
  db.query(sql, (err, rows) => {
    result.resolve(rows)
  })
  return result.promise;
}

/* получение списка документов продукта */
exports.get_product_list_docs = params => {
  let result = q.defer();
  let sql = 'SELECT * FROM product_docs WHERE uid=?';
  let param = [params.uid];
  db.query(sql, param, (err, rows) => {
    let response = {err: err, data: rows};
    result.resolve(response)
  })
  return result.promise;
}

/* получение всех способов получения денег */
exports.get_all_get_money = () =>{
  let result = q.defer();
  let sql = 'SELECT * FROM get_money';
  db.query(sql, (err, rows) => {
    result.resolve(rows)
  })
  return result.promise;
}

/* получение списка спосоов получения денег у продукта */
exports.get_product_list_money = params => {
  let result = q.defer();
  let sql = 'SELECT * FROM product_money WHERE uid=?';
  let param = [params.uid];
  db.query(sql, param, (err, rows) => {
    let response = {err: err, data: rows};
    result.resolve(response)
  })
  return result.promise;
}

/* добавление новго способа получения денег */
exports.add_money_new = params => {
  let result = q.defer();
  let sql = 'INSERT INTO get_money (name) VALUES (?)';
  let param = [params.name];
  db.query(sql, param, (err, rows) => {
    let response = {err: err, data: rows.affectedRows}
    result.resolve(response);
  })
  return result.promise;
}

/* добавление новго документа */
exports.add_docs_new = params => {
  let result = q.defer();
  let sql = 'INSERT INTO docs (name) VALUES (?)';
  let param = [params.name];
  db.query(sql, param, (err, rows) => {
    let response = {err: err, data: rows.affectedRows}
    result.resolve(response);
  })
  return result.promise;
}