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
		set_height_list_product();
    sel_product_on_load();
    wysing()
	}
};

/* формирование wysing */
var wysing = () => {
  let height = get_height_body() / 2.5;
  shotdescription = new Jodit('#short_description');
  description = new Jodit('#description', {
    height: height
  });
}

/* удаление всех классов active из меню */
var disable_active_item_nav = () => {
	$('#ul-main-nav li').removeClass('active');
};

/* получение данных о выбраннго продукте */
var get_product_data = uid => {
	let params = {uid: uid};
	socket.emit('get_product_data', params, res => {
		if (res.err != null) {
			show_err(res);
		} else {
			load_data_porudct(res.data);
		}
	});
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
var load_data_porudct = value => {
	$('#id_offer_cpa').text(value.id_offer_cpa);
	if (value.status == 'true') {
		$('#status').prop('checked', true);
	} else {
		$('#status').prop('checked', false);
  }
  $('#banner').val(value.banner);
  $('#btn-prewiev-banner').attr('href', 'https://kreditor.store/public/img/products/' + value.banner)
  $('#name').val(value.name)
  $('#type_product option').each((ind, row) => {
		if($(row).text() == value.type_product){
      $(row).prop('selected', true)
    }
  })

  shotdescription.value =value.short_description;
  description.value = value.description
};
