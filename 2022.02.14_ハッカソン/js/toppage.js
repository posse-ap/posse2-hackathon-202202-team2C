// 動画再生のためのjs
const introductionVideo = document.getElementById('introductionVideo');
const closeBtn = document.getElementById('closeBtn');
const waveyBtn =  document.getElementById('waveyBtn');

function Play1(){
	document.getElementById("test1").play();
};
//一時停止
function Pause1(){
	document.getElementById("test1").pause();
};
//最初から再生
function PlayFromFirst1(){
	document.getElementById("test1").currentTime=0;
	document.getElementById("test1").play();
};
function Play2(){
    introductionVideo.classList.add('real');
    waveyBtn.classList.add('fake');
	document.getElementById("test1").play();
    // introductionVideo.classList.add('video.clicked')
};

closeBtn.addEventListener('click',()=> {
    introductionVideo.classList.remove('real');
    waveyBtn.classList.remove('fake')
});


// 概要のタイトルタイピング
const typing = (element, sentence) => {
  [...sentence].forEach((character, index) => {
    setTimeout(() => {
      document.querySelector(element).textContent += character;
    }, 200 * ++index);
  });
}

typing('#typing1', 'P O S S E 2 の 基 本 情 報');
typing('#typing2', 'P O S S E 2 の 魅 力 と は ？');
typing('#typing3', 'ここが  違 う！！P O S S E 2 な ら で は の 特 徴');
typing('#typing4', '2.5 期 生 P O S S E 2 の メ ン バ ー か ら ひ と  言');

