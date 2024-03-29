'use strict';

/* при выборе продукта */
$(document).ready(() => {
	disable_active_item_nav(); //убрать все классы active в главном меню
	page(); //проверка открытой страницы
});

/* при выборе продукта */
$('#list-product li').on('click', element => {
	$('#list-product li').removeClass('active');
	$(element.target).addClass('active');
	let uid = $(element.target).attr('uid');
	get_product_all_data(uid).then();
	$('.nav-product a')
		.eq(0)
		.click();
});

/* при вобре меню продукта */
$('.nav-product a').on('click', element => {
	hide_all_form_ptroduct();
	$('.nav-product a').removeClass('active');
	$(element.target).addClass('active');
	let id = $(element.target).attr('id');
	load_form_product(id);
	if (id == 'nav-product-geo' || id == 'nav-product-offices') {
		$('#btn-save-product').hide();
	} else {
		$('#btn-save-product').show();
	}
});

/* добавление способа получения денег */
$('#add-money-new').on('click', () => {
	let name = $('#name-money-new').val();
	if (name != '') {
		let params = { name: name };
		add_money_new(params).then(res => {
			if (res.err != null) {
				show_err(res);
			} else {
				let msg = { msg: 'Способ получения успешно добавлен, обновите страницу' };
				show_sucess(msg);
			}
		});
	} else {
		let params = { err: 'Поле пустое, введите данные' };
		show_err(params);
	}
});

/* добалвение документа */
$('#add-docs-new').on('click', () => {
	let name = $('#name-docs-new').val();
	if (name != '') {
		let params = { name: name };
		add_docs_new(params).then(res => {
			if (res.err != null) {
				show_err(res);
			} else {
				let msg = { msg: 'Способ получения успешно добавлен, обновите страницу' };
				show_sucess(msg);
			}
		});
	} else {
		let params = { err: 'Поле пустое, введите данные' };
		show_err(params);
	}
});

/* сохранение данных о продукте */
$('#btn-save-product').on('click', () => {
	save_data_product();
});

/* добавдение новой организации */
$('#add-organization').on('click', () => {
	let name = $('#name-organization-new').val();
	let params = { name: name };
	add_organization(params);
});

/* загрузка гео с cpa */
$('#load_geo_cpa').on('click', () => {
	let uid = $('#load_geo_cpa').attr('uid');
	let id_offer_cpa = $('#load_geo_cpa').attr('id_offer_cpa');
  let type_product = $('#load_geo_cpa').attr('type_product');
  let params ={uid: uid, id_offer_cpa: id_offer_cpa, type_product:type_product }
	load_geo_cpa_leads(params).then(() => {});
});
