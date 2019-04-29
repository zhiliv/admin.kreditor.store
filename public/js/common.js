'use strict';

/* при выборе продукта */
$(document).ready(() => {
  disable_active_item_nav();//убрать все классы active в главном меню
  page();//проверка открытой страницы

})

/* при выборе продукта */
$('#list-product li').on('click', element => {
  $('#list-product li').removeClass('active');
  $(element.target).addClass('active');
  let uid =$(element.target).attr('uid');
  get_product_data(uid)
})

/* выбор первого продукта после загрузки */
var sel_product_on_load = () => {
  $('#list-product li').eq(0).click();
}