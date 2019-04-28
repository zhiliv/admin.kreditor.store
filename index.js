'use strict';

var express = require('express'),
	app = express(),
  server = require('http').Server(app),
  bodyParser = require('body-parser'),
	clc = require('cli-color');
//socket = require('./modules/lib/eventsSocket');

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
		rs.render('index', {
		});
});

try {
	server.listen(SettingServer.Port, SettingServer.Adedress, () => {
		console.log(
			clc.yellow(
				'Сервер запущен по адресу',
				'http://' + SettingServer.Adedress + ':' + SettingServer.Port
			)
		);
		//socket.Events(server);
	});
} catch (err) {
	console.log(clc.red('Произошла ошибка:', err.message));
}
