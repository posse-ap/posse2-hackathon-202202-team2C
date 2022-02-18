//ローディング
$(window).on("load", function () {
  $("#splash-logo").delay(3000).fadeOut("slow"); //ロゴを1.2秒でフェードアウトする記述

  //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
  $("#splash")
    .delay(1500)
    .fadeOut("slow", function () {
      //ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述

      $("body").addClass("appear"); //フェードアウト後bodyにappearクラス付与
    });
  //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

  //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
  $(".splash-bg").on("animationend", function () {
    //この中に動かしたいJSを記載
  });
  //=====ここまで背景が伸びた後に動かしたいJSをまとめる
});

const loading = document.getElementById("splash");
const keyName = "visited";
const keyValue = true;

if (!sessionStorage.getItem(keyName)) {
  //sessionStorageにキーと値を追加
  sessionStorage.setItem(keyName, keyValue);

  //ここに初回アクセス時の処理
  console.log("初めての訪問です");
  // loading.style.display = "none";
  setTimeout(() => {
    loading.style.display = "none";
  }, 5000);
} else {
  //ここに通常アクセス時の処理
  console.log("訪問済みです");
  loading.style.display = "none";
}
