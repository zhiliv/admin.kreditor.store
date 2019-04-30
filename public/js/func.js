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
	}
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
	let params = {uid: uid};
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
	await load_data_porudct(data, list_docs, list_money);
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
var load_data_porudct = (value, list_docs, list_money) => {
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
  $('#url_offer').val(value.url_offer)

	/* документы */
	off_all_docs_and_get_money(); //отключение всех документов и способов полечнеия
	$('.list-docs input').each((ind, row) => {
		let name = $(row).val();
		if (_.where(list_docs, {name: name}).length > 0) {
			$(row).prop('checked', true);
		}
	});
	/* способы получения денег */
	$('.list-money input').each((ind, row) => {
		let name = $(row).val();
		if (_.where(list_money, {name: name}).length > 0) {
			$(row).prop('checked', true);
		}
	});
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
	}
};

/* скрыть все формы продукта */
var hide_all_form_ptroduct = () => {
	$('.blc-description, .blc-information, .blc-docs, .blc-money').hide();
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
		console.log("TCL: save_data_product -> params", params)
  });
  await update_data_product(params).then(res => {
		err = res.errf;
  })
  await update_docs_products(params)
};

/* полная обновление списка документов */
var update_docs_products = async params => {
	console.log("TCL: params", params)
  let result = Q.defer()
/* обновление списка документов у продукта */
  var update_list_docs_product = param => {
    let result = Q.defer()
    socket.emit('update_list_docs_product', param, res => {
      result.resolve(res)
    })
    return result.promise;
  }

  let list_docs;
  await get_checked_docs_product().then(res => {
		list_docs = {data:res, uid:params.uid};
  })
  await update_list_docs_product(list_docs).then(res => {
    
  })

}



/* получение списка активных документов у продукта */
var get_checked_docs_product = () => {
  let arr = [];
  let result = Q.defer();
  $('.list-docs input:checked').each((ind, row) => {
		let name = $(row).val();
    arr.push(name)
    if(ind == $('.list-docs input:checked').length-1){
      result.resolve(arr)
    }
  })
  return result.promise;
}

/* обнолвение данных продукта */
var update_data_product = params => {
  let result = Q.defer()
  socket.emit('update_data_product', params, res => {
    result.resolve(res)
  })
  return result.promise;
}

/* доабвление новой организации */
var add_organization = params => {
	if (add_organization.name != '') {
		socket.emit('add_organization', params, res => {
			if (res.err != null) {
				show_err(res);
			} else {
				let msg = {msg: 'Организация успешно добалвена, обновите страницу'};
        show_sucess(msg);
        $('#close-form-add-organization').click()
			}
		});
	} else {
		let params = {err: 'Поле пустое, введите данные'};
		show_err(params);
	}
};

/* получение данных проудкта с формы */
var get_data_product_form_form = async () => {
	let result = Q.defer();
	let uid = $('#uid').text();
	uid = {uid: uid};
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
  }
  result.resolve(params)
  return result.promise;
};
