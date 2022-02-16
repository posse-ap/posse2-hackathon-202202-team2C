"use strict";
// 神経衰弱ゲーム
window.onload = function () {
  function Card(suit, num) {
    this.suit = suit;
    this.num = num;
    this.front;
    this.setFront = function () {
      this.front = `${this.suit}${("0" + this.num).slice(-2)}.jpg`;
    };
  }
  const cards = [];
  const suits = ["s", "d", "h", "c"];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j <= 6; j++) {
      let card = new Card(suits[i], j);
      card.setFront();
      cards.push(card);
    }
  }
  function shuffle() {
    let i = cards.length;
    while (i) {
      let index = Math.floor(Math.random() * i--);
      var temp = cards[index];
      cards[index] = cards[i];
      cards[i] = temp;
    }
  }
  shuffle();
  const table = document.getElementById("table");
  for (let i = 0; i < suits.length; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 6; j++) {
      let td = document.createElement("td");
      let tempCard = cards[i * 6 + j];
      td.classList.add("card", "back");
      td.onclick = flip;
      //以下を追加
      td.num = tempCard.num;
      td.style.backgroundImage = `url(../miniGame/game_pictures/${tempCard.front})`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  //以下の変数を追加
  let firstCard = null;
  let flipTimerId = NaN;
  function flip(e) {
    let td = e.target;
    //下の一行をコメントアウト
    //td.classList.toggle('back');
    //以下を追記
    if (!td.classList.contains("back") || flipTimerId) {
      return; //表のカードをクリックしても何もしない。
    }
    td.classList.remove("back"); //カードを表にする。
    if (firstCard === null) {
      firstCard = td; //1枚目だったら今めくったカードをfirstCardに設定
    } else {
      //2枚目だったら1枚目と比較して結果を判定する。
      if (firstCard.num === td.num) {
        //２枚が同じだったときの処理
        firstCard = null;
      } else {
        flipTimerId = setTimeout(function () {
          firstCard.classList.add("back");
          td.classList.add("back");
          flipTimerId = NaN;
          firstCard = null;
        }, 1200);
      }
    }
  }
};

// ブロックゲーム
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// パドルのパラメータ
var paddleHeight = 10;
var paddleWidth = 50;
var paddleOffsetBottom = 80;
var paddleX = (canvas.width-paddleWidth)/2;
// 入力を記録する変数
var rightPressed = false;
var leftPressed = false;
// ブロックのパラメータ
var brickColumnCount = 14;
var brickRowCount = 6;
var brickColors = ["#F39800", "#FFF100", "#8FC31F"];
var brickWidth = 25;
var brickHeight = 10;
var brickPadding = 5;
var brickOffsetTop = 70;
var brickOffsetLeft = 30;
// ボールのパラメータ
var ballRadius = 5;
var x = canvas.width/2;
var y = canvas.height-paddleOffsetBottom-brickHeight;
var dx = 3;
var dy = -3;
// スコアを記録する。
var score = 0;
var maxscore = 0;
for(var r=0; r<brickRowCount; r++) {
  for(var c=0; c<brickColumnCount; c++) {
    maxscore += 3-Math.floor(r/2);
  }
}
// ライフを記録する。
var lives = 3;
// 経過時間を記録する関数
var start_time;// グローバル変数にしている。
var timer=0;
// 3桁の数字で表示するため
var addZero = function(value){
  if (value<10) {
    value = '00' + value;
  }else if (value<100){
    value = '0' + value;
  }
  return value;
}
// イベント開始の関数
function startTimer(){
  start_time = new Date();
  setInterval(goTimer, 10);
}
// この関数をループさせる。
function goTimer(){
  var milli = new Date() - start_time;
  var seconds = Math.floor(milli / 1000);
  seconds = addZero(seconds);
  timer = seconds;
}
// ブロックが当たった後に消えるようにする。
var bricks = [];
for(var r=0; r<brickRowCount; r++) {
  bricks[r] = [];
  for(var c=0; c<brickColumnCount; c++) {
    // statusでブロックが崩されたかを記憶する。
    bricks[r][c] = { x: 0, y: 0, status: 1 };
  }
}
// ボタンの処理で制御する
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// ボタンが押された時のイベント(変数をTrueにする)
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
// ボタンが押されなくなった時のイベント(変数をfalseに戻す)
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}
// マウスの位置で制御する
document.addEventListener("mousemove", mouseMoveHandler, false);
// マウスが動いた時のイベント。マウスのx座標がキャンバスのx座標内にあれば、その位置に持ってくる。
function mouseMoveHandler(e) {
var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX>0){
    if(relativeX<canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
  }
}
// 音を鳴らす。
function sound(tag){
  document.getElementById(tag).currentTime = 0;
  document.getElementById(tag).play();
}
// 衝突を検知する。
function collisionDetection() {
  for(var r=0; r<brickRowCount; r++) {
    for(var c=0; c<brickColumnCount; c++) {
      var b = bricks[r][c];
      if(b.status == 1) { // ブロックが存在しているかを確認する。
        if(x>b.x){
          if (x<b.x+brickWidth){
            if (y>b.y){
              if (y<b.y+brickHeight){
                dy = -dy;
                if (Math.floor(Math.random() * Math.floor(8)) == 0){
                  sound("soundUp");
                  if (dy>0){
                    dy += 1;
                  }else{
                    dy -= 1;
                  }
                }
                b.status = 0;
                score+=3-Math.floor(r/2);
                sound("soundBrick");
                // 全てのブロックを崩した場合
                if(score == maxscore) {
                  alert("YOU WIN\nYour Time is " + timer);
                  document.location.reload();
                }
              }
            }
          }
        }
      }
    }
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight-paddleOffsetBottom, paddleWidth, paddleHeight);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();
}
// ブロックを1つずつ描画する。
function drawBricks() {
  for(var r=0; r<brickRowCount; r++) {
    for(var c=0; c<brickColumnCount; c++) {
      if(bricks[r][c].status == 1) {
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColors[Math.floor(r/2)];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "30px 'Comic Sans MS'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(score, 30, 40);
}
function drawTime() {
  ctx.font = "30px 'Comic Sans MS'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(timer, canvas.width/2-30, 40);
}
function drawLives() {
  ctx.font = "30px 'Comic Sans MS'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(lives, canvas.width-65, 40);
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 毎フレームごとに削除
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawTime();
  drawLives();
    collisionDetection();
  // 左端と右端で弾ませる(ボールの半径を考える)
  if(x + dx>canvas.width-ballRadius || x + dx<ballRadius) {
    sound("soundBar");
    dx = -dx;
  }
  // 上端で弾ませる(ボールの半径を考える)
  if(y + dy<ballRadius) {
    sound("soundBar");
    dy = -dy;
  }
  // ボールがパドルの位置に到達した時
  else if(y+dy>canvas.height-paddleOffsetBottom-ballRadius){
    if (y+dy<canvas.height-paddleOffsetBottom-ballRadius+brickHeight) {
      // ボールのx座標がパドル上にあれば、跳ね返る
      if(x>paddleX){
        if(x<paddleX + paddleWidth){
          sound("soundBar");
          dy = -dy;
        }
      }
    }
    // ボールが下端に到達した時
    if(y + dy>canvas.height-ballRadius){
      sound("soundFail");
      lives--;
      // 残機がなくなれば失敗する。
      if(!lives) {
        alert("YOU LOSE");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-paddleOffsetBottom-brickHeight;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }
  // パドルの移動指定されたピクセルだけ動く
  if(rightPressed){
    if(paddleX<canvas.width-paddleWidth) {
      paddleX += 5;
    }
  }
  else if(leftPressed){
    if (paddleX>0) {
      paddleX -= 5;
    }
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
function setCanvas() {
  // setcanvasで全部はっか
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawTime();
  drawLives();
}
// 初期状態を描いて待機
setCanvas();
function gameButton() {
  draw();
  document.getElementById("start").innerHTML = "SPEED UP";
  document.getElementById("start").style.fontSize = "10px";
}

// ゲーム説明のスクロール処理
function fadeAnime() {
  $(".lineTrigger").each(function () {
    //lineTriggerというクラス名が
    var elemPos = $(this).offset().top - 50; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("lineanime"); // 画面内に入ったらlineanimeというクラス名を追記
    } else {
      $(this).removeClass("lineanime"); // 画面外に出たらlineanimeというクラス名を外す
    }
  });
}
$(window).scroll(function () {
  fadeAnime(); /* アニメーション用の関数を呼ぶ*/
});
