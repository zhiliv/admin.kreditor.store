'use strict';
var db = require('./DB');

/* создание соединения с socket */
exports.Events = server => {
	var io = require('socket.io')(server);
	io.on('connection', socket => {
		/* получение информации о продукте */
		socket.on('get_product_data', (params, callback) => {
			db.get_product_data(params).then(res => {
				callback(res);
			});
		});

		/* получение списка документов продукта */
		socket.on('get_product_list_docs', (params, callback) => {
			db.get_product_list_docs(params).then(res => {
				callback(res);
			});
		});

		/* получение списка способов получения денег у продукта */
		socket.on('get_product_list_money', (params, callback) => {
			db.get_product_list_money(params).then(res => {
				callback(res);
			});
		});
	});
};
