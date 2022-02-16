'use strict'

// let dayHTML =document.getElementById('dayHTML');
// let hourHTML =document.getElementById('hourHTML');
// let minHTML =document.getElementById('minHTML');
// let secHTML =document.getElementById('secHTML');

function countdown() {


  const now = new Date();//今の時間
  const tomorrow = new Date(2022, 4, 31, 23, 59, 59);//登録締め切り。今は仮に5月末
  const differ = tomorrow.getTime() - now.getTime();//締め切りまであと何ミリ秒か


  const sec = Math.floor(differ / 1000) % 60;//ミリ秒を秒に直してから
  const min = Math.floor(differ / 1000 / 60) % 60;//1時間=60分だからね
  const hour = Math.floor(differ / 1000 / 60 / 60) % 24;
  const day = Math.floor(differ / 1000 / 60 / 60 / 24);

  document.getElementById("day").textContent = String(day).padStart(2, "0");
  document.getElementById("hour").textContent = String(hour).padStart(2, "0"); //一桁になった時0がつくように
  document.getElementById("min").textContent = String(min).padStart(2, "0")
  document.getElementById("sec").textContent = String(sec).padStart(2, "0")

  setTimeout(countdown, 1000);//1秒毎に繰り返す

  // console.log(day,hour,min,sec);


}

countdown();