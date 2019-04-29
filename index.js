'use strict';

var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	bodyParser = require('body-parser'),
	clc = require('cli-color'),
	db = require('./lib/modules/DB'),
  socket = require('./lib/modules/eventsSocket');

var tokenLeads = 'a2a43051c137da3cfc698f80b10176b0'; //токен Leads.su

/* глабальные переменные */
var SettingServer = {};
SettingServer.Adedress = '127.0.0.1';
SettingServer.Port = 80;
/* ---------- */
app.set('view engine', 'pug'); //подключение шаблонизатора
app.use('/public', express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

/* главная страница */
app.get('/', async (req, rs) => {
	let all_product;
	await db.Get_All_Product().then(res => {
		all_product = res;
  });
  let all_category;
  await db.get_all_category().then(res => {
    all_category = res;
  })
	rs.render('index', {
    all_product: all_product,
    all_category: all_category
	});
});

try {
	server.listen(SettingServer.Port, SettingServer.Adedress, () => {
		console.log(
			clc.yellow(
				'Сервер запущен по адресу',
				'http://' + SettingServer.Adedress + ':' + SettingServer.Port,
			),
		);
		socket.Events(server);
	});
} catch (err) {
	console.log(clc.red('Произошла ошибка:', err.message));
}

