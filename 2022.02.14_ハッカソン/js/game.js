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

// ブロックゲーム
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 3;
var dy = -3;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
const form1 = document.forms.dialog1;
const form2 = document.forms.dialog2;

//ブロック 通常時のstatusは1
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
//statusが1なら表示されてる
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.strokeStyle = "rgb(211, 105, 105)";
                var grad = ctx.createLinearGradient(50, 40, 150, 200);
                grad.addColorStop(0, 'rgb(253, 132, 132)');
                grad.addColorStop(.5, 'rgb(166, 239, 255)');
                grad.addColorStop(1, 'rgb(243, 160, 142)');
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}
//ボール
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(211, 105, 105,0.7)";
    ctx.fill();
    ctx.closePath();
};
//ボールの受け皿
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "rgb(211, 105, 105,0.4)";
    ctx.fill();
    ctx.closePath();
};
//受け皿の移動処理
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if (e.kry == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.kry == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
//keyが押されるとtrueになって外れるとfalseに戻る
//IE/Edge に対応するためにleft/rightも登録

//もしボールがブロック内にあったらstatus=0になる
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        form2.style.display = "block";
                        form2.yes.addEventListener("click", () => {
                            location.reload();
                        });

                        form2.no.addEventListener("click", () => {
                            console.log("「いいえ」がクリックされました");
                            canvas.style.display = "none"
                        });
                    }
                }
            }
        }
    }
}

// 10msごとにdrawを繰り返す
// drawはボールの中心の座標を2ずつ移動させてる drawのなかでdrawBallを発動
// clearRectでボールの軌跡を消去してる

//もし今いる位置が0(ボール半径のぞく)より小さければ or canvasの幅より大きかったら進行方向を逆にする

//score表示
var score = 0;
function drawScore() {
    ctx.font = "oblique 14px 'MS PGothic', san-serif";
    ctx.fillStyle = "rgb(211, 105, 105,1)";
    ctx.fillText("Score:" + score, 8, 20);
};
//lives表示
var lives = 3;
function drawLives() {
    ctx.font = "oblique 14px 'MS PGothic', san-serif"
    ctx.fillStyle = "rgb(211, 105, 105,1)";
    ctx.fillText("LIves:" + lives, canvas.width - 65, 20);
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();


    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (lives == 0) {
                form1.style.display = "block";

                form1.yes.addEventListener("click", () => {
                    location.reload();
                });

                form1.no.addEventListener("click", () => {
                    console.log("「いいえ」がクリックされました");
                    canvas.style.display = "none"
                });
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
};
// draw();

const form3 = document.getElementById('dialog3');
const start = document.getElementById('start');
start.addEventListener("click", () => {
    draw();
    form3.style.display = "none";
});

none.addEventListener("click", () => {
    console.log("「いいえ」がクリックされました");
    
    // canvas.style.display = "none"
});

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
