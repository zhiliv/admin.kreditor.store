'use strict';
var db = require('./DB');

/* создание соединения с socket */
exports.Events = server => {
	var io = require('socket.io')(server);
	io.on('connection', socket => {
		//проверка соединения
		socket.on('Authentication', (params, callback) => {
			//авторизация
			DB.Authentication(params).then(res => {
				callback(res); //отправляем полученные данные
			});
    });
    
    socket.on('get_product_data', (params, cb) => {
			db.get_product_data(params).then (res => {
        cb(res)
      })
    })

	});
};
