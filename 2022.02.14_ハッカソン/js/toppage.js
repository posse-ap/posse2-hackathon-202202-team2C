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
