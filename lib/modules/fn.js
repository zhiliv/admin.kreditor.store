'use strict';
const db = require('./DB'),
	async = require('async'),
	q = require('q'),
	_ = require('underscore');

exports.update_list_docs_product = async params => {
	let result = q.defer();
	let delete_docs;
	await db.delete_all_docs_products(params).then(res => {
		delete_docs = res;
	});
	if (delete_docs.err == null) {
		var err;
		async.eachOfSeries(params.data, async (row, ind) => {
			let param = { name: row };
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
