'use strict';
var db = require('./DB'),
	fn = require('./fn');

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

		/* добавление новго способа получения денег */
		socket.on('add_money_new', (params, callback) => {
			db.add_money_new(params).then(res => {
				callback(res);
			});
		});

		/* добавление новго документа */
		socket.on('add_docs_new', (params, callback) => {
			db.add_docs_new(params).then(res => {
				callback(res);
			});
		});

		/* добавление новой организации */
		socket.on('add_organization', (params, callback) => {
			db.add_organization(params).then(res => {
				callback(res);
			});
		});

		/* добавление новой организации */
		socket.on('update_data_product', (params, callback) => {
			db.update_data_product(params).then(res => {
				callback(res);
			});
		});

		/* обновление списка документов */
		socket.on('update_list_docs_product', (params, callback) => {
			fn.update_list_docs_product(params).then(res => {
				callback(res);
			});
		});

		/* добавление новой организации */
		socket.on('update_list_money_product', (params, callback) => {
			fn.update_list_money_product(params).then(res => {
				callback(res);
			});
		});

		/* получение регионов продукта */
		socket.on('get_regions', (params, callback) => {
			fn.get_regions(params).then(res => {
				callback(res);
			});
		});

		/* добавление региона продукту */
		socket.on('add_region_product', (params, callback) => {
			fn.add_region_product(params).then(() => {
				callback();
			});
		});

		/* отключение региона продукта и всмех городов региона */
		socket.on('disable_region_product', (params, callback) => {
			db.disable_region_product(params).then(() => {
				callback();
			});
		});

		/* получение списков городов */
		socket.on('get_city', (params, callback) => {
			fn.get_city(params).then(res => {
				callback(res);
			});
		});

		/* добавление города продукта */
		socket.on('add_city_product', (params, callback) => {
			fn.add_city_product(params).then(() => {
				callback();
			});
		});

		/* отключение региона продукта и всмех городов региона */
		socket.on('disable_city_product', (params, callback) => {
			db.disable_city_product(params).then(() => {
				callback();
			});
    });
    
    /* загрузка гео с leads  */
    socket.on('load_geo_cpa_leads', (params, callback) => {
      fn.load_geo_cpa_leads(params).then()
    })
	});
};
