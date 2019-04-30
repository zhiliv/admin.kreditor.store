'use strict';
const db = require('./DB'),
	async = require('async'),
	q = require('q'),
	_ = require('underscore');

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
  }
  else{
    db.update_region_product(params).then(() => {
      result.resolve()
    })
  }
	return result.promise;
};
