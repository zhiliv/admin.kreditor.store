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
  let all_periods;
  await db.get_all_periods().then(res => {
    all_periods =res
    })
  let all_cpa;
  await db.get_all_cpa().then(res => {
    all_cpa = res;
  })
  let all_organization;
  await db.get_all_organization().then(res => {
    all_organization = res;
  })
  let all_docs;
  await db.get_all_dosc().then(res => {
    all_docs = res;
  })
	rs.render('index', {
    all_product: all_product,
    all_category: all_category,
    all_periods: all_periods,
    all_cpa: all_cpa,
    all_organization: all_organization,
    all_docs: all_docs
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

