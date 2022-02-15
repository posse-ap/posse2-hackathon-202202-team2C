'use strict';
// let body = document.getElementById('body');
// let line1 = document.getElementById('line1');
// let line2 = document.getElementById('line2');
// let line3 =document.getElementById('line3');
// let navi = document.getElementById('navi');
// let burger = document.getElementById('hamburger')
// let header = document.getElementById('header')


// function hamburger() {
//   line1.classList.toggle('line_1');
//   line2.classList.toggle('line_2');
//   line3.classList.toggle('line_3');
//   navi.classList.toggle('in');

//   document.getElementById('popupCover').classList.toggle('black-out');

//   header.classList.toggle('header')
// }

// document.getElementById('hamburger').addEventListener('click' , function () {
//   hamburger();
//   if($('.header').hasClass('header')){
//     $('#body').removeClass('scroll-prevent');
//     } else {
//       $('#body').addClass('scroll-prevent');
//       console.log('a')
//   }
// } );




// ーーーーーやり直しますーーーー


//スクロールをするとハンバーガーメニューに変化するための設定を関数でまとめる
function FixedAnime() {
  //ヘッダーの高さを取得
  var headerH = $('#header').outerHeight(true);
  var scroll = $(window).scrollTop();
  if (scroll >= headerH){//ヘッダーの高さ以上までスクロールしたら
      $('.openbtn1').addClass('fadeDown');//.openbtnにfadeDownというクラス名を付与して
      $('#header').addClass('dnone');//#headerにdnoneというクラス名を付与
    }else{//それ以外は
      $('.openbtn1').removeClass('fadeDown');//fadeDownというクラス名を除き
      $('#header').removeClass('dnone');//dnoneというクラス名を除く
    }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  FixedAnime();//スクロールをするとハンバーガーメニューに変化するための関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  FixedAnime();//スクロールをするとハンバーガーメニューに変化するための関数を呼ぶ
});


//ボタンをクリックした際のアニメーションの設定
$(".openbtn1").click(function () {//ボタンがクリックされたら
  $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#header").toggleClass('panelactive');//ヘッダーにpanelactiveクラスを付与
});
$("#g-navi li a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn1").removeClass('active');//ボタンの activeクラスを除去し
    $("#header").removeClass('panelactive');//ヘッダーのpanelactiveクラスも除去
});


//リンク先のidまでスムーススクロール
//※ページ内リンクを行わない場合は不必要なので削除してください
//     $('#g-navi li a').click(function () {
//   var elmHash = $(this).attr('href');
//   var pos = $(elmHash).offset().top-0;
//   $('body,html').animate({scrollTop: pos}, 1000);
//   return false;
// });