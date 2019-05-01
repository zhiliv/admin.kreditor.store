'use strict';

var mysql = require('mysql2'),
	clc = require('cli-color'),
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
	try {
		db.query(sql, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции name проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение информации о продукте */
exports.get_product_data = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM kredit_products WHERE uid=?';
	let value = [params.uid];
	try {
		db.query(sql, value, (err, rows) => {
			let response = { err: err, data: rows[0] };
			result.resolve(response);
		});
	} catch (err) {
		console.log(clc.red('В функции get_product_data проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение всех категорий */
exports.get_all_category = () => {
	let result = q.defer();
	let sql = 'SELECT * FROM type_product';
	try {
		db.query(sql, (err, rows) => {
			rows.unshift({ name: '-', id_category: '-' });
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_all_category проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение периодов */
exports.get_all_periods = () => {
	let result = q.defer();
	let sql = 'SELECT * FROM type_period';
	try {
		db.query(sql, (err, rows) => {
			rows.unshift({ name: '-' });
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_all_periods проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение всех партнерских программ */
exports.get_all_cpa = () => {
	let result = q.defer();
	let sql = 'SELECT * FROM cpa';
	try {
		db.query(sql, (err, rows) => {
			rows.unshift({ name: '-' });
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_all_cpa проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение всех организаций */
exports.get_all_organization = () => {
	let result = q.defer();
	let sql = 'SELECT * FROM organizations';
	try {
		db.query(sql, (err, rows) => {
			rows.unshift({ name: '-' });
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_all_organization проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение всех документов */
exports.get_all_dosc = () => {
	let result = q.defer();
	let sql = 'SELECT * FROM docs';
	try {
		db.query(sql, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_all_dosc проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение списка документов продукта */
exports.get_product_list_docs = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM product_docs WHERE uid=?';
	let param = [params.uid];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(
			clc.red('В функции get_product_list_docs проиошла ошибка:'),
			clc.white(err.message),
		);
	}
	return result.promise;
};

/* получение всех способов получения денег */
exports.get_all_get_money = () => {
	let result = q.defer();
	let sql = 'SELECT * FROM get_money';
	try {
		db.query(sql, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_all_get_money проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение списка спосоов получения денег у продукта */
exports.get_product_list_money = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM product_money WHERE uid=?';
	let param = [params.uid];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(
			clc.red('В функции get_product_list_money проиошла ошибка:'),
			clc.white(err.message),
		);
	}
	return result.promise;
};

/* добавление новго способа получения денег */
exports.add_money_new = params => {
	let result = q.defer();
	let sql = 'INSERT INTO get_money (name) VALUES (?)';
	let param = [params.name];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows.affectedRows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(clc.red('В функции add_money_new проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* добавление новго документа */
exports.add_docs_new = params => {
	let result = q.defer();
	let sql = 'INSERT INTO docs (name) VALUES (?)';
	let param = [params.name];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows.affectedRows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(clc.red('В функции add_docs_new проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* добавление новой организации */
exports.add_organization = params => {
	let result = q.defer();
	let sql = 'INSERT INTO organizations (name) VALUES (?)';
	let param = [params.name];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows.affectedRows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(clc.red('В функции add_organization проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* обновдение информации о продукте */
exports.update_data_product = params => {
	let result = q.defer();
	let sql =
		'UPDATE kredit_products SET name=?, id_category=?, id_offer_cpa=?, description=?, short_description=?, type_product=?, banner=?, summ_min=?, summ_max=?, free_period=?, type_free_period=?, status=?, srok_min=?, type_srok_min=?, srok_max=?, type_srok_max=?, time_for_consideration=?, type_time_for_consideration=?,  internet_bank=?, age_min=?, age_max=?, percent_min=?, type_percent_min=?, percent_max=?, type_percent_max=?, cpa=?, url_offer=?, profit=?, type_profit=?, phone=?, site=?, organization=? WHERE uid=?';
	let param = [
		params.name,
		params.id_category,
		params.id_offer_cpa,
		params.description,
		params.short_description,
		params.type_product,
		params.banner,
		params.summ_min,
		params.summ_max,
		params.free_period,
		params.type_free_period,
		params.status,
		params.srok_min,
		params.type_srok_min,
		params.srok_max,
		params.type_srok_max,
		params.time_for_consideration,
		params.type_time_for_consideration,
		params.internet_bank,
		params.age_min,
		params.age_max,
		params.percent_min,
		params.type_percent_min,
		params.percent_max,
		params.type_percent_max,
		params.cpa,
		params.url_offer,
		params.profit,
		params.type_profit,
		params.phone,
		params.site,
		params.organization,
		params.uid,
	];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows.affectedRows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(clc.red('В функции update_data_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* удаление документов у продукта */
exports.delete_all_docs_products = params => {
	let result = q.defer();
	let sql = 'DELETE FROM product_docs WHERE uid=?';
	let param = [params.uid];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows.affectedRows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(
			clc.red('В функции delete_all_docs_products проиошла ошибка:'),
			clc.white(err.message),
		);
	}
	return result.promise;
};

/* добавление документа продукта */
exports.add_docs_product = params => {
	let result = q.defer();
	let sql = 'INSERT INTO product_docs (uid, name) VALUES (?, ?)';
	let param = [params.uid, params.name];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(clc.red('В функции add_docs_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* удаление документов у продукта */
exports.delete_all_money_products = params => {
	let result = q.defer();
	let sql = 'DELETE FROM product_money WHERE uid=?';
	let param = [params.uid];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows.affectedRows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(
			clc.red('В функции delete_all_money_products проиошла ошибка:'),
			clc.white(err.message),
		);
	}
	return result.promise;
};

/* добавление документа продукта */
exports.add_money_product = params => {
	let result = q.defer();
	let sql = 'INSERT INTO product_money (uid, name) VALUES (?, ?)';
	let param = [params.uid, params.name];
	try {
		db.query(sql, param, (err, rows) => {
			let response = { err: err, data: rows };
			result.resolve(response);
		});
	} catch (err) {
		console.log(clc.red('В функции add_money_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение всех регионов  */
exports.get_all_regions = () => {
	let result = q.defer();
	let sql = 'SELECT * FROM regions';
	try {
		db.query(sql, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_all_regions проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение регионов продукта */
exports.get_region_product = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM geo_product WHERE uid=? AND status="true" AND (cid is null OR cid="")';
	let param = [params.uid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_region_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* проверка продукта у региона */
exports.check_region_product = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM geo_product WHERE uid=? AND rid=? AND (cid is null OR cid="")';
	let param = [params.uid, params.rid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows.length);
		});
	} catch (err) {
		console.log(clc.red('В функции check_region_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение данных о регоине*/
exports.get_data_region = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM regions WHERE rid=?';
	let param = [params.rid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows[0]);
		});
	} catch (err) {
		console.log(clc.red('В функции get_data_region проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* добавление региона для продутка */
exports.add_region_product = params => {
	let result = q.defer();
	let sql =
		'INSERT INTO geo_product (uid, region_name, region_kladr, status, rid) VALUES (?,?,?,?,?)';
	let param = [params.uid, params.data.name, params.data.kladr, 'true', params.rid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции add_region_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* обновление статуса региона у продукта */
exports.update_region_product = params => {
	let result = q.defer();
	let sql = 'UPDATE geo_product SET status=? WHERE uid=? AND rid=?';
	let param = ['true', params.uid, params.rid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(
			clc.red('В функции update_region_product проиошла ошибка:'),
			clc.white(err.message),
		);
	}
	return result.promise;
};

/* отключение региона у продукта */
exports.disable_region_product = params => {
	let result = q.defer();
	let sql = 'UPDATE geo_product SET status=? WHERE uid=? AND rid=?';
	let param = ['false', params.uid, params.rid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(
			clc.red('В функции disable_region_product проиошла ошибка:'),
			clc.white(err.message),
		);
	}
	return result.promise;
};

/* получение всех городов региона */
exports.get_all_city = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM city WHERE rid=?';
	let param = [params.rid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_all_city проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение городов продукта по региону */
exports.get_product_city = params => {
	let result = q.defer();
	let sql =
		'SELECT * FROM geo_product WHERE uid=? AND rid=? AND (cid is NOT null OR cid!="") AND status="true"';
	let param = [params.uid, params.rid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции get_product_city проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* проверка города у продукта */
exports.check_city_product = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM geo_product WHERE uid=? AND cid=?';
	let param = [params.uid, params.cid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows.length);
		});
	} catch (err) {
		console.log(clc.red('В функции check_city_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* получение данных о регоине*/
exports.get_data_city = params => {
	let result = q.defer();
	let sql = 'SELECT * FROM city WHERE cid=?';
	let param = [params.cid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows[0]);
		});
	} catch (err) {
		console.log(clc.red('В функции get_data_city проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* добавление города для продутка */
exports.add_city_product = params => {
	let result = q.defer();
	let sql =
		'INSERT INTO geo_product (uid, rid, region_name, region_kladr, cid, city_name, city_type, city_kladr, status) VALUES (?,?,?,?,?,?, ?,?,?)';
	let param = [
		params.uid,
		params.data_region.rid,
		params.data_region.name,
		params.data_region.kladr,
		params.data_city.cid,
		params.data_city.name,
		params.data_city.city_type,
		params.data_city.kladr,
		'true',
	];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции add_city_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* обновление статуса региона у продукта */
exports.update_city_product = params => {
	let result = q.defer();
	let sql = 'UPDATE geo_product SET status=? WHERE uid=? AND cid=?';
	let param = ['true', params.uid, params.cid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции update_city_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/* отключение региона у продукта */
exports.disable_city_product = params => {
	let result = q.defer();
	let sql = 'UPDATE geo_product SET status=? WHERE uid=? AND cid=?';
	let param = ['false', params.uid, params.cid];
	try {
		db.query(sql, param, (err, rows) => {
			result.resolve(rows);
		});
	} catch (err) {
		console.log(clc.red('В функции disable_city_product проиошла ошибка:'), clc.white(err.message));
	}
	return result.promise;
};

/*   
try {
    db.query(sql, param, (err, rows) => {
      result.resolve(rows);
    });
  } catch (err) {
    console.log(clc.red('В функции name проиошла ошибка:'), clc.white(err.message));
  } 
  return result.promise;
  */
