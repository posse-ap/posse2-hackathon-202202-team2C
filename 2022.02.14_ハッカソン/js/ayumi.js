const next = document.getElementById('next_button');//右のボタンのid取得
const prev = document.getElementById('prev_button');//左のボタンのid取得

const slider_width = document.getElementsByClassName('pictures_li')[0];
let width = slider_width.clientWidth;//liの幅を取得

const slider_list = document.getElementsByClassName('pictures_ul')[0];//動かすのはulタグだから、ulタグを取得
// const slider_list_item = document.querySelectorAll('pictures_li');

let counter = 0;

next.addEventListener('click', () => { //nextボタンをクリックしたら3秒かけて、X座標方向に-liの長さ×カウンターの分進む
    counter++;
    slider_list.style.transition = ".3s";
    slider_list.style.transform = `translateX(${+(-width * counter)}px)`;
    document.getElementById(`slider_dots_${counter}`).style.background = "#ffffff";
    document.getElementById(`slider_dots_${counter - 1}`).style.background = "#353643";
});

prev.addEventListener('click', () => { //prevボタンをクリックしたら3秒かけて、X座標方向に-liの長さ×カウンター(減っていく)の分進む
    counter--;
    slider_list.style.transition = ".3s";
    slider_list.style.transform = `translateX(${+(-width * counter)}px)`;
});

next.addEventListener("click", function () { //一番最後の写真になったら最初の写真にもどる、ゆくゆくcounterの数で取得
    if (counter == 8) { slider_list.style.transform = `translateX(100px)`; };
    //以下省略
});

prev.addEventListener("click", function () {
    if (counter == 1) return;
    //以下省略

});