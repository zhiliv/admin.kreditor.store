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

/* добавление новой организации */
exports.add_organization = params =>{
  let result = q.defer()
  let sql = 'INSERT INTO organizations (name) VALUES (?)';
  let param = [params.name]
  db.query(sql, param, (err, rows) => {
    let response = {err: err, data: rows.affectedRows}
    result.resolve(response)
  })
  return result.promise;
} 

/* обновдение информации о продукте */
exports.update_data_product = params => {
  let result = q.defer()
  let sql = 'UPDATE kredit_products SET name=?, id_category=?, id_offer_cpa=?, description=?, short_description=?, type_product=?, banner=?, summ_min=?, summ_max=?, free_period=?, type_free_period=?, status=?, srok_min=?, type_srok_min=?, srok_max=?, type_srok_max=?, time_for_consideration=?, type_time_for_consideration=?,  internet_bank=?, age_min=?, age_max=?, percent_min=?, type_percent_min=?, percent_max=?, type_percent_max=?, cpa=?, url_offer=?, profit=?, type_profit=?, phone=?, site=?, organization=? WHERE uid=?';
  let param = [params.name, params.id_category, params.id_offer_cpa, params.description, params.short_description, params.type_product, params.banner, params.summ_min, params.summ_max, params.free_period, params.type_free_period, params.status, params.srok_min, params.type_srok_min, params.srok_max, params.type_srok_max, params.time_for_consideration, params.type_time_for_consideration, params.internet_bank, params.age_min, params.age_max, params.percent_min, params.type_percent_min, params.percent_max, params.type_percent_max, params.cpa, params.url_offer, params.profit, params.type_profit, params.phone, params.site, params.organization, params.uid]
  db.query(sql, param, (err, rows) => {
    let response = {err: err, data: rows.affectedRows}
    result.resolve(response)
  })
  return result.promise;
}

/* удаление документов у продукта */
exports.delete_all_docs_products = params => {
  let result = q.defer();
  let sql = 'DELETE FROM product_docs WHERE uid=?';
  let param = [params.uid];
  db.query(sql, param, (err, rows) => {
    let response = {err: err, data: rows.affectedRows}
    result.resolve(response)
  })
  return result.promise;
}

/* добавление документа продукта */
exports.add_docs_product = params => {
  let result = q.defer();
  let sql = 'INSER INTO product_docs (name) VALUES (?)';
  let param = [params.name];
  db.query(sql, param, (err, rows) => {
    let response = {err: err, data: rows.affectedRows}
    result.resolve(response)
  })
  return result.promise;
}