"use strict";


$(".fadeLeftTrigger").each(function () {
  //fadeLeftTriggerというクラス名が
  var elemPos = $(this).offset().top - 20; //要素より、50px上の
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();
  if (scroll >= elemPos - windowHeight) {
    $(this).addClass("fadeLeft"); // 画面内に入ったらfadeLeftというクラス名を追記
  } else {
    $(this).removeClass("fadeLeft"); // 画面外に出たらfadeLeftというクラス名を外す
  }
});

$(".fadeRightTrigger").each(function () {
  //fadeRightTriggerというクラス名が
  var elemPos = $(this).offset().top - 20; //要素より、50px上の
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();
  if (scroll >= elemPos - windowHeight) {
    $(this).addClass("fadeRight"); // 画面内に入ったらfadeRightというクラス名を追記
  } else {
    $(this).removeClass("fadeRight"); // 画面外に出たらfadeRightというクラス名を外す
  }
});
