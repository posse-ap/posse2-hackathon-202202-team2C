'use strict';
//画像配列
let images = [
  "https://pbs.twimg.com/media/FETKO_sacAApz-F?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/FEfSbM5aUAArU_A?format=jpg&name=large",
  "https://pbs.twimg.com/media/FHIQYMOaMAsRnmb?format=jpg&name=large",
];
//選択肢配列
let questionsText = [
  "この中でPOSSE2のマーケ局長は誰？",
  "この中でPOSSE2.5期生は誰？",
  "この中でPOSSE2の恒例行事となっているものは何？"
]
let quizSet = [
    ["おのかん","かれん","あきら"],
    ["えーき","さち","りさ"],
    ["お菓子パーティー","運動会","朝まで生討論"]
].map(shuffle);
//正解の配列
let true_answers = ["おのかん", "りさ", "朝まで生討論"]
let explanationText = [
  "ちなみにマーケ局とは、SNSの運用や、講演会の開催を通して、外部への発信と巻き込みを行う部署です！",
  "2.0期生は去年の6月に、2.5期生は去年の11月にPOSSEに入会してくれました！",
  "POSSE2では、ハーバーズに宿泊して朝まで色々な話をします！今後の人生相談や、恋バナなんかも！？"
]
//シャッフル
function shuffle(arr) {
    for (let k = arr.length - 1; k > 0; k--) { // i = ランダムに選ぶ終点のインデックス
      const j = Math.floor(Math.random() * (k + 1));  // j = 範囲内から選ぶランダム変数
      [arr[j], arr[k]] = [arr[k], arr[j]]; // 分割代入 i と j を入れ替える
    }
    return arr;
}
//本体
for(let i = 0; i < quizSet.length; i++) {
    let question_box =
      `<h1 class="question-text">` +
      `${i + 1}.${questionsText[i]}` +
      `</h1>` +
      `<div class="quiz-image-container">` +
      `<img class="quiz-image" src="` +
      images[i] +
      `" alt="問題の写真">` +
      `</div>` +
      `<div class="box1">` +
      `<ul id="ul-${i}" >`;
            for(let x = 0; x < 3; x++){
            question_box = question_box+
                `<li id='${i}-${x}' onclick="onclickFunction(${i},${x})" >`+quizSet[i][x] +`</li>`
            };
            question_box =
              question_box +
              `</ul>` +
              `</div>` +
              `<div class="quiz-result" id="ans-t-${i}">` +
              `<p class ="quiz-result-title quiz-result-title-succeeded">正解！</p>` +
              `<p class ="quiz-result-explanation">正解は「` +
              true_answers[i] +
              `」です！<br>${explanationText[i]}</p>` +
              `</div>` +
              `<div class="quiz-result" id="ans-f-${i}">` +
              `<p class ="quiz-result-title quiz-result-title-failed">不正解！</p>` +
              `<p class ="quiz-result-explanation">正解は「` +
              true_answers[i] +
              `」です！<br>${explanationText[i]}</p>` +
              `</div>`;
    //html内に入れる
    document.getElementById('quiz-box').insertAdjacentHTML('beforeend',question_box);
    
    var onclickFunction = (question_number,clicked_number) => {
        //クリックした際に全て赤に変更
        let clicked_option = document.getElementById(question_number+"-"+clicked_number)
        clicked_option.classList.add("failed");
        //正解のボックスが青になるようにする（中身で判断）
        for ( let p = 0; p < 3; p++ ){
            if(quizSet[question_number][p] == true_answers[question_number]){
                let true_choice = document.getElementById(question_number+"-"+p);
                true_choice.classList.add("succeeded");
                true_choice.classList.remove("failed");//先ほどの「クリックした際に全て赤に変更」を取り除く
            }
        }
        //全ての選択肢のクリック無効
        let choice0 = document.getElementById(question_number+"-0");
        let choice1 = document.getElementById(question_number+"-1");
        let choice2 = document.getElementById(question_number+"-2");
        choice0.style.pointerEvents="none";
        choice1.style.pointerEvents="none";
        choice2.style.pointerEvents="none";
            //正解を選択したときの解説ブロックを表示
            if (quizSet[question_number][clicked_number] == true_answers[question_number]){
                document.getElementById('ans-t-'+question_number).style.display="block";
                document.getElementById('ul-'+question_number).scrollIntoView({behavior:'smooth',block:'start'});
            //不正解を選択したときの解説ブロックを表示
            }else{
                document.getElementById('ans-f-'+question_number).style.display="block";
                document.getElementById('ul-'+question_number).scrollIntoView({behavior:'smooth',block:'start'});
            }
}
};