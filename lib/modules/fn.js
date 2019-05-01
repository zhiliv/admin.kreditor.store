'use strict';

const db = require('./DB'),
	async = require('async'),
	q = require('q'),
	request = require('superagent'), //библиотека для работы с http для получения
	_ = require('underscore'),
	tokenLeads = 'a2a43051c137da3cfc698f80b10176b0'; //токен Leads.su
require('superagent-charset')(request);

/* обновлвние документов у продукта */
exports.update_list_docs_product = async params => {
	let result = q.defer();
	let delete_docs;
	await db.delete_all_docs_products(params).then(res => {
		delete_docs = res;
	});
	if (delete_docs.err == null) {
		var err;
		async.eachOfSeries(params.data, async (row, ind) => {
			let param = { uid: params.uid, name: row };
			await db.add_docs_product(param).then(res => {
				if (res.err != null) {
					err = ers.err;
				}
			});
			if (ind == params.data.length - 1) {
				let response = { err: null, data: 'success' };
				result.resolve(response);
			}
		});
	} else {
		let response = { err: delete_docs.err, data: null };
		result.resolve(response);
	}
	return result.promise;
};

/* обновлвние способов получения денег у продукта */
exports.update_list_money_product = async params => {
	let result = q.defer();
	let delete_money;
	await db.delete_all_money_products(params).then(res => {
		delete_money = res;
	});
	if (delete_money.err == null) {
		var err;
		async.eachOfSeries(params.data, async (row, ind) => {
			let param = { uid: params.uid, name: row };
			await db.add_money_product(param).then(res => {
				if (res.err != null) {
					err = ers.err;
				}
			});
			if (ind == params.data.length - 1) {
				let response = { err: null, data: 'success' };
				result.resolve(response);
			}
		});
	} else {
		let response = { err: delete_money.err, data: null };
		result.resolve(response);
	}
	return result.promise;
};

/* получение региона продукта */
exports.get_regions = async params => {
	let result = q.defer();
	let region_all;
	await db.get_all_regions().then(res => {
		region_all = res;
	});
	let region_product;
	await db.get_region_product(params).then(res => {
		region_product = res;
	});
	await get_list_for_product(region_all, region_product).then(res => {
		result.resolve(res);
	});
	return result.promise;
};

/* формирование списков регонов */
var get_list_for_product = (region_all, region_product) => {
	let result = q.defer();
	let arr_all = [];
	let arr_product = [];
	async.eachOfSeries(region_all, async (row, ind) => {
		if (_.where(region_product, { rid: row.rid }).length > 0) {
			await arr_product.push(row);
		} else {
			await arr_all.push(row);
		}
		if (ind == region_all.length - 1) {
			arr_all = _.sortBy(arr_all, 'name');
			arr_product = _.sortBy(arr_product, 'name');
			let obj = { all: arr_all, product: arr_product };
			result.resolve(obj);
		}
	});
	return result.promise;
};

/* добавление региона продукту */
exports.add_region_product = async params => {
	let result = q.defer();
	let count;
	await db.check_region_product(params).then(res => {
		count = res;
	});
	if (count == 0) {
		let data_region;
		await db.get_data_region(params).then(res => {
			data_region = res;
		});
		let params_add = { uid: params.uid, rid: params.rid, data: data_region };
		await db.add_region_product(params_add).then(() => {
			result.resolve();
		});
	} else {
		await db.update_region_product(params).then(() => {
			result.resolve();
		});
	}
	return result.promise;
};

/* полчение списка городо */
exports.get_city = async params => {
	let result = q.defer();
	let city_all;
	await db.get_all_city(params).then(res => {
		city_all = res;
	});
	let city_product;
	await db.get_product_city(params).then(res => {
		city_product = res;
	});
	await get_list_city_for_product(city_all, city_product).then(res => {
		result.resolve(res);
	});
	return result.promise;
};

/* формирование списков городов */
var get_list_city_for_product = (city_all, city_product) => {
	let result = q.defer();
	let arr_all = [];
	let arr_product = [];
	async.eachOfSeries(city_all, async (row, ind) => {
		if (_.where(city_product, { cid: row.cid }).length > 0) {
			await arr_product.push(row);
		} else {
			await arr_all.push(row);
		}
		if (ind == city_all.length - 1) {
			arr_all = _.sortBy(arr_all, 'name');
			arr_product = _.sortBy(arr_product, 'name');
			let obj = { all: arr_all, product: arr_product };
			result.resolve(obj);
		}
	});
	return result.promise;
};

/* добавление города продукту */
exports.add_city_product = async params => {
	let result = q.defer();
	let count;
	await db.check_city_product(params).then(res => {
		count = res;
	});
	if (count == 0) {
		let data_city;
		await db.get_data_city(params).then(res => {
			data_city = res;
		});
		let data_region;
		await db.get_data_region(params).then(res => {
			data_region = res;
		});
		let params_add = {
			uid: params.uid,
			cid: params.cid,
			data_city: data_city,
			data_region: data_region,
		};
		await db.add_city_product(params_add).then(() => {
			result.resolve();
		});
	} else {
		await db.update_city_product(params).then(() => {
			result.resolve();
		});
	}
	return result.promise;
};

/*  загрузка гео с leads  */
exports.load_geo_cpa_leads = async params => {
	/* получение данных пол ссылке */
	var get_data_url = params => {
		let result = q.defer();
		let url =
			'http://api.leads.su/webmaster/offers?token=' +
			tokenLeads +
			'&limit=500' +
			'&id=' +
			params.id_offer_cpa +
			'&geo=1';
		request
			.get(url)
			.buffer(true)
			.end((err, html) => {
				result.resolve(JSON.parse(html.text));
			});
		return result.promise;
	};

	var check_country = data => {
		let result = q.defer();
		if (data.length > 0) {
			async.eachOfSeries(data, async (row, ind) => {
				if (row.id == 175) {
					result.resolve(row.regions);
				} else {
					result.resolve([]);
				}
			});
		} else {
			result.resolve([]);
		}
		return result.promise;
	};

	/* обход списка регионов */
	var processing_regions = params => {
    let result = q.defer();
    if(params.data > 0){
		async.eachOfSeries(params.data, async (row, ind) => {
			let param;
			if (params.stat == 'true') {
				param = { rid: row.id, id_offer_cpa: params.id_offer_cpa, uid: params.uid };
			} else {
				param = { rid: row.rid, id_offer_cpa: params.id_offer_cpa, uid: params.uid };
			}
			let count;
			await db.check_region_product(param).then(res => {
				count = res;
			});
			if (count == 0) {
				let data_region;
				await db.get_data_region(param).then(res => {
					data_region = res;
				});
				let params_add = { uid: params.uid, rid: param.rid, data: data_region };
				await db.add_region_product(params_add).then(() => {
					result.resolve();
				});
			} else {
				await db.update_region_product(params).then(() => {
					result.resolve();
				});
			}
    });
  }
  else{
    result.resolve()
  }
		return result.promise;
	};

	let result = q.defer();
	let arr = []; //результат
	let param = { id_offer_cpa: params.id_offer_cpa };
	let geo;
	await get_data_url(param).then(res => {
		geo = res.data[0].geo.countries;
	});
	let regions;
	await check_country(geo).then(res => {
		regions = { data: res, id_offer_cpa: params.id_offer_cpa, uid: params.uid };
	});
	if (regions.data.length > 0) {
		regions.stat = 'true';
		await processing_regions(regions).then(() => {
			result.resolve();
		});
	} else {
		regions.stat = 'false';
		await processing_regions(regions).then(() => {
			result.resolve();
		});
  }
  return result.promise;
};
