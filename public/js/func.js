'use strict';
var socket = io.connect($(location).attr('href'));
var shortdesc, desc;

/* показать ошибку */
var show_err = params => {
	let option = {
		type: 'warning',
		delay: 7000,
	};
	$('#error').toast(option);
	$('#err-text').text(params.err);
	$('#error').toast('show');
};

/* показать ошибку */
var show_sucess = params => {
	let option = {
		type: 'warning',
		delay: 7000,
	};
	$('#sucess').toast(option);
	$('#scs-text').text(params.msg);
	$('#sucess').toast('show');
};

/* получение высоты навигационной панели */
var get_height_menu = () => {
	let height = $('#main_nav').height();
	return height;
};

/* получение высоты окна */
var get_height_body = () => {
	let height = $('body').height();
	return height;
};

/* установка высоты списка продуктов */
var set_height_list_product = () => {
	let height_body = get_height_body();
	let height_menu = get_height_menu();
	let height = height_body - height_menu - height_menu - 10;
	$('#list-product').height(height);
};

/* проверка открытой страницы */
var page = () => {
	if (
		$(location)
			.attr('href')
			.indexOf('/#') != -1
	) {
		$('#item-nav-product').addClass('active');
		hide_all_form_ptroduct();
		set_height_list_product();
		wysing();
		sel_product_on_load();
		set_height_list_geo();
	}
};

/* установка высоты в блоках гео */
var set_height_list_geo = () => {
	let height = (get_height_body() - get_height_menu()) / 2.6;
	$('.list-geo').height(height);
};

/* формирование wysing */
var wysing = () => {
	let height = get_height_body() / 2.5;
	shortdesc = new Jodit('#short_description');
	desc = new Jodit('#description', {
		height: height,
	});
};

/* удаление всех классов active из меню */
var disable_active_item_nav = () => {
	$('#ul-main-nav li').removeClass('active');
};

/* получение данных о выбраннго продукте */
var get_product_all_data = async uid => {
	let data;
	let params = { uid: uid };
	await get_product_data(params).then(res => {
		data = res;
	});
	let list_docs;
	await get_product_list_docs(params).then(res => {
		list_docs = res;
	});
	let list_money;
	await get_product_list_money(params).then(res => {
		list_money = res;
	});
	let regions;
	await get_regions(params).then(res => {
		regions = res;
	});
	await load_data_porudct(data, list_docs, list_money, regions);
};

/* получение даннызх о продукте */
var get_product_data = params => {
	let result = Q.defer();
	socket.emit('get_product_data', params, res => {
		if (res.err != null) {
			show_err(res);
		} else {
			result.resolve(res.data);
		}
	});
	return result.promise;
};

/* получение списка подкументов продукта */
var get_product_list_docs = params => {
	let result = Q.defer();
	socket.emit('get_product_list_docs', params, res => {
		if (res.err != null) {
			show_err(res);
		} else {
			result.resolve(res.data);
		}
	});
	return result.promise;
};

/* получение списка cпособов получения денег у продукта */
var get_product_list_money = params => {
	let result = Q.defer();
	socket.emit('get_product_list_money', params, res => {
		if (res.err != null) {
			show_err(res);
		} else {
			result.resolve(res.data);
		}
	});
	return result.promise;
};

/* заполнение формы продукта */
var load_data_porudct = (value, list_docs, list_money, regions) => {
	/* описание */
	$('#id_offer_cpa').text(value.id_offer_cpa);
	$('#uid').text(value.uid);
	if (value.status == 'true') {
		$('#status').prop('checked', true);
	} else {
		$('#status').prop('checked', false);
	}
	$('#banner').val(value.banner);
	$('#btn-prewiev-banner').attr(
		'href',
		'https://kreditor.store/public/img/products/' + value.banner,
	);
	$('#name').val(value.name);
	$('#type_product option').each((ind, row) => {
		if ($(row).text() == value.type_product) {
			$(row).prop('selected', true);
		}
	});
	shortdesc.value = value.short_description;
	desc.value = value.description;

	/* информация */
	$('#cr').text(value.cr + '%');
	$('#ar').text(value.ar + '%');
	$('#epc').text(value.epc + '%');
	$('#summ_min').val(value.summ_min);
	$('#summ_max').val(value.summ_max);
	$('#free_period').val(value.free_period);
	$('#type_free_period option').each((ind, row) => {
		if ($(row).text() == value.type_free_period) {
			$(row).prop('selected', true);
		}
	});
	$('#internet_bank option').each((ind, row) => {
		if ($(row).val() == value.internet_bank) {
			$(row).prop('selected', true);
		}
	});
	$('#age_min').val(value.age_min);
	$('#age_max').val(value.age_max);
	$('#srok_min').val(value.srok_min);
	$('#type_srok_min option').each((ind, row) => {
		if ($(row).val() == value.type_srok_min) {
			$(row).prop('selected', true);
		}
	});
	$('#srok_max').val(value.srok_max);
	$('#type_srok_max option').each((ind, row) => {
		if ($(row).val() == value.type_srok_max) {
			$(row).prop('selected', true);
		}
	});
	$('#percent_min').val(value.percent_min);
	$('#type_percent_min option').each((ind, row) => {
		if ($(row).val() == value.type_percent_min) {
			$(row).prop('selected', true);
		}
	});
	$('#percent_max').val(value.percent_max);
	$('#type_percent_max option').each((ind, row) => {
		if ($(row).val() == value.type_percent_max) {
			$(row).prop('selected', true);
		}
	});
	$('#time_for_consideration').val(value.time_for_consideration);
	$('#type_time_for_consideration option').each((ind, row) => {
		if ($(row).val() == value.type_time_for_consideration) {
			$(row).prop('selected', true);
		}
	});
	$('#phone').val(value.phone);
	$('#site').val(value.site);
	$('#cpa option').each((ind, row) => {
		if ($(row).val() == value.cpa) {
			$(row).prop('selected', true);
		}
	});
	$('#organization option').each((ind, row) => {
		if ($(row).val() == value.organization) {
			$(row).prop('selected', true);
		}
	});
	$('#profit').val(value.profit);
	$('#url_offer').val(value.url_offer);

	/* документы */
	off_all_docs_and_get_money(); //отключение всех документов и способов полечнеия
	$('.list-docs input').each((ind, row) => {
		let name = $(row).val();
		if (_.where(list_docs, { name: name }).length > 0) {
			$(row).prop('checked', true);
		}
	});
	/* способы получения денег */
	$('.list-money input').each((ind, row) => {
		let name = $(row).val();
		if (_.where(list_money, { name: name }).length > 0) {
			$(row).prop('checked', true);
		}
	});

	/* гео */
	fill_list_regions(regions).then(() => {
		on_click_regions();
	});
	if (value.cpa == 'Leads') {
		$('#load_geo_cpa').attr('id_offer_cpa', value.id_offer_cpa);
		$('#load_geo_cpa').attr('uid', value.uid);
		$('#load_geo_cpa').attr('type_product', value.type_product);
	} else {
		$('#load_geo_cpa').prop('disabled', true);
	}
};

/* загрузкаа гео продукта с leads */
var load_geo_cpa_leads = params => {
	let result = Q.defer();
	socket.emit('load_geo_cpa_leads', params, res => {
		result.resolve(res);
	});
	return result.promise;
};

/* заполнение списков регионов */
var fill_list_regions = async data => {
	let result = Q.defer();
	$('#region_all, #region_product').empty();
	await async.eachOfSeries(data.all, async (row, ind) => {
		$('<li>', {
			class: 'list-group-item list-group-item-action',
			text: row.name,
			rid: row.rid,
		}).appendTo('#region_all');
	});

	await async.eachOfSeries(data.product, async (row, ind) => {
		$('<li>', {
			class: 'list-group-item list-group-item-action',
			text: row.name,
			rid: row.rid,
		}).appendTo('#region_product');
		if (ind == data.product.length - 1) {
			result.resolve();
		}
	});
	return result.promise;
};

/* убрать все выделения документов и способов получения*/
var off_all_docs_and_get_money = () => {
	$('.list-docs input').prop('checked', false);
};

/* выбор первого продукта после загрузки */
var sel_product_on_load = () => {
	$('#list-product li')
		.eq(0)
		.click();
	$('.nav-product a')
		.eq(0)
		.click();
};

/* заггрузка форм продукта */
var load_form_product = params => {
	switch (params) {
		case 'nav-product-description':
			$('.blc-description').show();
			break;
		case 'nav-product-information':
			$('.blc-information').show();
			break;
		case 'nav-product-docs':
			$('.blc-docs').show();
			break;
		case 'nav-product-money':
			$('.blc-money').show();
			break;
		case 'nav-product-geo':
			$('.blc-geo').show();
			break;
	}
};

/* скрыть все формы продукта */
var hide_all_form_ptroduct = () => {
	$('.blc-description, .blc-information, .blc-docs, .blc-money, .blc-geo').hide();
};

/* добавдение нового способа получения денег */
var add_money_new = params => {
	let reuslt = Q.defer();
	socket.emit('add_money_new', params, res => {
		reuslt.resolve(res);
	});
	return reuslt.promise;
};

/* добавдение нового документа*/
var add_docs_new = params => {
	let reuslt = Q.defer();
	socket.emit('add_docs_new', params, res => {
		reuslt.resolve(res);
	});
	return reuslt.promise;
};

/* сохранение данных продукта */
var save_data_product = async () => {
	let params;
	let err;
	await get_data_product_form_form().then(res => {
		params = res;
	});
	await update_data_product(params).then(res => {
		err = res.err;
	});
	await update_docs_products(params).then(res => {
		err = res.err;
	});
	await update_money_products(params).then(res => {
		err = res.err;
	});
	if (err == null) {
		let msg = { msg: 'Данные о продукте успешно обновлены' };
		show_sucess(msg);
	} else {
		let msg = { err: err };
		show_err(msg);
	}
};

/* полная обновление списка документов */
var update_money_products = async params => {
	let result = Q.defer();
	/* обновление списка документов у продукта */
	var update_list_money_product = param => {
		let result = Q.defer();
		socket.emit('update_list_money_product', param, res => {
			result.resolve(res);
		});
		return result.promise;
	};

	let list_money;
	await get_checked_money_product().then(res => {
		list_money = { data: res, uid: params.uid };
	});
	await update_list_money_product(list_money).then(res => {
		result.resolve(res);
	});
	return result.promise;
};

/* получение списка активных документов у продукта */
var get_checked_money_product = () => {
	let arr = [];
	let result = Q.defer();
	$('.list-money input:checked').each((ind, row) => {
		let name = $(row).val();
		arr.push(name);
		if (ind == $('.list-money input:checked').length - 1) {
			result.resolve(arr);
		}
	});
	return result.promise;
};

/* полная обновление списка документов */
var update_docs_products = async params => {
	let result = Q.defer();
	/* обновление списка документов у продукта */
	var update_list_docs_product = param => {
		let result = Q.defer();
		socket.emit('update_list_docs_product', param, res => {
			result.resolve(res);
		});
		return result.promise;
	};

	let list_docs;
	await get_checked_docs_product().then(res => {
		list_docs = { data: res, uid: params.uid };
	});
	await update_list_docs_product(list_docs).then(res => {
		result.resolve(res);
	});
	return result.promise;
};

/* получение списка активных документов у продукта */
var get_checked_docs_product = () => {
	let arr = [];
	let result = Q.defer();
	$('.list-docs input:checked').each((ind, row) => {
		let name = $(row).val();
		arr.push(name);
		if (ind == $('.list-docs input:checked').length - 1) {
			result.resolve(arr);
		}
	});
	return result.promise;
};

/* обнолвение данных продукта */
var update_data_product = params => {
	let result = Q.defer();
	socket.emit('update_data_product', params, res => {
		result.resolve(res);
	});
	return result.promise;
};

/* доабвление новой организации */
var add_organization = params => {
	if (add_organization.name != '') {
		socket.emit('add_organization', params, res => {
			if (res.err != null) {
				show_err(res);
			} else {
				let msg = { msg: 'Организация успешно добалвена, обновите страницу' };
				show_sucess(msg);
				$('#close-form-add-organization').click();
			}
		});
	} else {
		let params = { err: 'Поле пустое, введите данные' };
		show_err(params);
	}
};

/* получение данных проудкта с формы */
var get_data_product_form_form = async () => {
	let result = Q.defer();
	let uid = $('#uid').text();
	uid = { uid: uid };
	let data;
	await get_product_data(uid).then(res => {
		data = res;
	});
	let params = {
		uid: data.uid,
		name: $('#name').val(),
		id_category: data.id_category,
		id_offer_cpa: data.id_offer_cpa,
		description: desc.value,
		short_description: shortdesc.value,
		type_product: $('#type_product option:selected').text(),
		banner: $('#banner').val(),
		summ_min: $('#summ_min').val(),
		summ_max: $('#summ_max').val(),
		free_period: $('#free_period').val(),
		type_free_period: $('#type_free_period option:selected').text(),
		status: String($('#status').is(':checked')),
		srok_min: $('#srok_min').val(),
		srok_max: $('#srok_max').val(),
		type_srok_max: $('#type_srok_max option:selected').text(),
		time_for_consideration: $('#time_for_consideration').val(),
		type_time_for_consideration: $('#type_time_for_consideration option:selected').text(),
		type_srok_min: $('#type_srok_min option:selected').text(),
		internet_bank: $('#internet_bank option:selected').val(),
		age_min: $('#age_min').val(),
		age_max: $('#age_max').val(),
		percent_min: $('#percent_min').val(),
		type_percent_min: $('#type_percent_min option:selected').text(),
		percent_max: $('#percent_max').val(),
		type_percent_max: $('#type_percent_max option:selected').text(),
		cpa: $('#cpa option:selected').text(),
		url_offer: $('#url_offer').val(),
		profit: $('#profit').val(),
		type_profit: data.type_profit,
		phone: $('#phone').val(),
		site: $('#site').val(),
		organization: $('#organization option:selected').text(),
	};
	result.resolve(params);
	return result.promise;
};

/* получение регионов  */
var get_regions = params => {
	let result = Q.defer();
	socket.emit('get_regions', params, res => {
		result.resolve(res);
	});
	return result.promise;
};

/* обработка клика по региону */
var on_click_regions = () => {
	$('#region_all li').on('dblclick', element => {
		let rid = $(element.target).attr('rid');
		let uid = get_uid_product();
		let params = { uid: uid, rid: rid };
		add_region_product(params);
	});

	$('#region_product li').on('dblclick', element => {
		let rid = $(element.target).attr('rid');
		let uid = get_uid_product();
		let params = { uid: uid, rid: rid };
		disable_region_product(params);
	});

	$('#region_product li').on('click', async element => {
		$('#region_product li').removeClass('active');
		$(element.target).addClass('active');
		let rid = $(element.target).attr('rid');
		let uid = get_uid_product();
		let params = { uid: uid, rid: rid };
		let city;
		await get_city(params).then(res => {
			city = res;
		});
		await fill_city(city).then(() => {
			on_click_city();
		});
	});
};

/* при клике на город */
var on_click_city = () => {
	$('#city_all li').on('dblclick', element => {
		let rid = $(element.target).attr('rid');
		let cid = $(element.target).attr('cid');
		let uid = get_uid_product();
		let params = { uid: uid, rid: rid, cid: cid };
		add_city_product(params);
	});

	$('#city_product li').on('dblclick', element => {
		let rid = $(element.target).attr('rid');
		let cid = $(element.target).attr('cid');
		let uid = get_uid_product();
		let params = { uid: uid, rid: rid, cid: cid };
		disable_city_product(params);
	});
};

/* отключение региона у продукта */
var disable_city_product = params => {
	socket.emit('disable_city_product', params, res => {
		udate_list_city_product(params);
	});
};

/* добавление города продукта */
var add_city_product = params => {
	socket.emit('add_city_product', params, res => {
		udate_list_city_product(params);
	});
};

/* обновить список городов */
var udate_list_city_product = async params => {
	let city;
	await get_city(params).then(res => {
		city = res;
	});
	await fill_city(city).then(() => {
		on_click_city();
	});
};

/* заполнение списков городов */
var fill_city = async data => {
	let result = Q.defer();
	$('#city_all, #city_product').empty();
	await async.eachOfSeries(data.all, async (row, ind) => {
		$('<li>', {
			class: 'list-group-item list-group-item-action',
			text: row.name,
			rid: row.rid,
			cid: row.cid,
		}).appendTo('#city_all');
	});

	await async.eachOfSeries(data.product, async (row, ind) => {
		$('<li>', {
			class: 'list-group-item list-group-item-action',
			text: row.name,
			rid: row.rid,
			cid: row.cid,
		}).appendTo('#city_product');
		if (ind == data.product.length - 1) {
			result.resolve();
		}
	});
	return result.promise;
};

/* получение городов по региону*/
var get_city = params => {
	let result = Q.defer();
	socket.emit('get_city', params, res => {
		result.resolve(res);
	});
	return result.promise;
};

/* отключение региона у продукта */
var disable_region_product = params => {
	socket.emit('disable_region_product', params, res => {
		udate_list_region_product(params);
	});
};

/* добавление реогиона продукту */
var add_region_product = params => {
	socket.emit('add_region_product', params, res => {
		udate_list_region_product(params);
	});
};

/* обновить список регионов */
var udate_list_region_product = async params => {
	let regions;
	await get_regions(params).then(res => {
		regions = res;
	});
	await fill_list_regions(regions).then(() => {
		on_click_regions();
	});
};

/* получение uid продукта */
var get_uid_product = () => {
	let uid = $('#list-product li.active').attr('uid');
	return uid;
};
