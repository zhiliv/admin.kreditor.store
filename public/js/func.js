'use strict';
var socket = io.connect($(location).attr('href'));
var shotdescription, description;

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
	shotdescription = new Jodit('#short_description');
	description = new Jodit('#description', {
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
  })
	await load_data_porudct(data, list_docs);
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

/* показать ошибку */
var show_err = params => {
	let option = {
		type: 'warning',
		delay: 7000,
	};
	$('.toast').toast(option);
	$('#err-text').text(params.err);
	$('.toast').toast('show');
};

/* заполнение формы продукта */
var load_data_porudct = (value, list_docs) => {
	/* описание */
	$('#id_offer_cpa').text(value.id_offer_cpa);
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
	shotdescription.value = value.short_description;
	description.value = value.description;

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

	/* документы */
  off_all_docs_and_get_money(); //отключение всех документов и способов полечнеия
  $('.list-docs input').each((ind, row) => {
		let name = $(row).val()
		if(_.where(list_docs, {name: name}).length > 0){
      console.log(name)
      $(row).prop('checked', true)
    }
  })
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
	}
};

/* скрыть все формы продукта */
var hide_all_form_ptroduct = () => {
	$('.blc-description, .blc-information, .blc-docs').hide();
};
