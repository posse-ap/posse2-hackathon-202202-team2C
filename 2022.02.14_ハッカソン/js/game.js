'use strict';
window.onload=function(){
  function Card(suit,num){
    this.suit=suit;
    this.num=num;
    this.front;
    this.setFront=function(){
      this.front=`${this.suit}${('0'+this.num).slice(-2)}.jpg`;
    };
  }
  const cards=[];
  const suits=['s','d','h','c'];
  for(let i=0;i<suits.length;i++){
    for(let j=1;j<=6;j++){
      let card=new Card(suits[i],j);
      card.setFront();
      cards.push(card);
    }
  }
  function shuffle(){
    let i=cards.length;
    while(i){
      let index=Math.floor(Math.random()*i--);
      var temp=cards[index];
      cards[index]=cards[i];
      cards[i]=temp;
    }
  }
  shuffle();
  const table=document.getElementById('table');
  for(let i=0;i<suits.length;i++){
    let tr=document.createElement('tr');
    for(let j=0;j<6;j++){
      let td=document.createElement('td');
      let tempCard=cards[i*6+j];
      td.classList.add('card','back');
      td.onclick=flip;
      //以下を追加
      td.num=tempCard.num;
      td.style.backgroundImage=`url(../miniGame/game_pictures/${tempCard.front})`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  //以下の変数を追加
  let firstCard=null;
  let flipTimerId=NaN;
  function flip(e){
    let td=e.target;
    //下の一行をコメントアウト
    //td.classList.toggle('back');
    //以下を追記
    if(!td.classList.contains('back') || flipTimerId){
      return;//表のカードをクリックしても何もしない。
    }
    td.classList.remove('back');//カードを表にする。
    if(firstCard===null){
      firstCard=td;//1枚目だったら今めくったカードをfirstCardに設定
    }else{
      //2枚目だったら1枚目と比較して結果を判定する。
      if(firstCard.num===td.num){
        //２枚が同じだったときの処理
        firstCard=null;
      }else{
        flipTimerId=setTimeout(function(){
          firstCard.classList.add('back');
          td.classList.add('back');
          flipTimerId=NaN;
          firstCard=null;
        },1200);
      }


    }
  }
}

// スクロール処理
function fadeAnime(){
  $('.lineTrigger').each(function(){ //lineTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
      $(this).addClass('lineanime');// 画面内に入ったらlineanimeというクラス名を追記
    }else{
      $(this).removeClass('lineanime');// 画面外に出たらlineanimeというクラス名を外す
    }
  }); }
  $(window).scroll(function (){
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
  });