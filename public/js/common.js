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
});
