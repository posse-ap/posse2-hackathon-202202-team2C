'use strict';
let body = document.getElementById('body');
let line1 = document.getElementById('line1');
let line2 = document.getElementById('line2');
let line3 =document.getElementById('line3');
let navi = document.getElementById('navi');
let burger = document.getElementById('hamburger')
let header = document.getElementById('header')


function hamburger() {
  line1.classList.toggle('line_1');
  line2.classList.toggle('line_2');
  line3.classList.toggle('line_3');
  navi.classList.toggle('in');

  document.getElementById('popupCover').classList.toggle('black-out');

}

document.getElementById('hamburger').addEventListener('click' , function () {
  hamburger();
  if($('.in').hasClass('in')){
    $('#body').addClass('scroll-prevent');
    } else {
      $('#body').removeClass('scroll-prevent');
  
  }
} );

// ナビゲーションをスイッチ

function FixedAnime(){
 //ヘッダーの高さを取得
  var headerH = $('#headerNav').outerHeight(true);
  var scroll = $(window).scrollTop();
  if (scroll >= headerH){//ヘッダーの高さ以上までスクロールしたら
  $('.hamburger').addClass('fadeDown');//.openbtnにfadeDownというクラス名を付与して
  $('#headerNav').addClass('dnone');//#headerにdnoneというクラス名を付与
  }else{//それ以外は
  $('.hamburger').removeClass('fadeDown');//fadeDownというクラス名を除き
  $('#headerNav').removeClass('dnone');//dnoneというクラス名を除く
  }

}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	FixedAnime();//スクロールをするとハンバーガーメニューに変化するための関数を呼ぶ
});
