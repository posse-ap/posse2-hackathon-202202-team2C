





"use strict";
//選択肢配列
let questionsText = [
  "この中でPOSSE2のマーケ局長は誰？",
  "この中でPOSSE2.5期生は誰？",
  "この中でPOSSE2の恒例行事となっているものは何？",
];

//選択肢（それぞれの0番目のが正解になっている）
let optionTextArray = [
  ["おのかん", "かれん", "あきら"],
  ["りさ", "じん", "さち"],
  ["朝まで生討論", "お菓子パーティー", "運動会"],
];

//回答ボックスのメッセージ
let answerBoxArray = [
  "正解は「おのかん」です！",
  "正解は「りさ」です！",
  "正解は「朝まで生討論」です！",
];

let explanationText = [
  "ちなみにマーケ局とは、SNSの運用や、講演会の開催を通して、外部への発信と巻き込みを行う部署です！",
  "2.0期生は去年の6月に、2.5期生は去年の11月にPOSSEに入会してくれました！",
  "POSSE2では、ハーバーズに宿泊して朝まで色々な話をします！今後の人生相談や、恋バナなんかも！？",
];



//画像配列
let images = [
  "https://pbs.twimg.com/media/FETKO_sacAApz-F?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/FEfSbM5aUAArU_A?format=jpg&name=large",
  "https://pbs.twimg.com/media/FHIQYMOaMAsRnmb?format=jpg&name=large",
];

//ソートされた配列
let a = [0, 1, 2];
let j = 0;
let r = 0;
let tmp = 0;

//下のfor文の中に書いたhtmlをぶち込む先
let quizDivWrapper = document.getElementById("quizBox");

//htmlへ記述したいことをfor文で繰り返し生成している。
for (let i = 0; i < 3; i++) {
  let optionHtml = [
    ` <li id="correctAnswerQ${i + 1}" onclick="show_answer_correct(${i + 1})">${
      optionTextArray[i][0]
    }<img src="./picture/quiz${i}-1.jpg"></li> `,

    ` <li id="wrongAnswerQ${i + 1}_1" onclick="show_answer_wrong_1(${i + 1})">${
      optionTextArray[i][1]
    }<img src="./picture/quiz${i}-2.jpg"></li> `,

    ` <li id="wrongAnswerQ${i + 1}_2" onclick="show_answer_wrong_2(${i + 1})">${
      optionTextArray[i][2]
    }<img src="./picture/quiz${i}-3.jpg"></li> `,
  ];

  for (j = a.length - 1; j > 0; j--) {
    //乱数生成を使ってランダムに取り出す値を決める
    r = Math.floor(Math.random() * (j + 1));
    //取り出した値と箱の外の先頭の値を交換する
    tmp = a[j];
    a[j] = a[r];
    a[r] = tmp;
  }

  let articles =
    '<div class="box1"> ' +
    `<h2 class="question">${i + 1}.${questionsText[i]}</h2>` +
    //選択肢 一番上（配列の0番目）が正解の選択肢になっている。
    `<ul id="optionList${i + 1}">` +
    optionHtml[a[0]] +
    optionHtml[a[1]] +
    optionHtml[a[2]] +
    "</ul>" +
    //正解の時の回答ボックスのメッセージ
    `<div class="hidden_message_correct quiz-result" id="correctPopQ${
      i + 1
    }">` +
    '<p class="quiz-result-title quiz-result-title-succeeded">正解！</p>' +
    `<p>${answerBoxArray[i]}</p>` +
    `<p>${explanationText[i]}</p>` +
    `<img class="quiz-image" src="${images[i]}">` +
    "</div>" +
    //不正解の時の回答ボックスのメッセージ
    `<div class="hidden_message_wrong quiz-result" id="wrongPopQ${i + 1}">` +
    '<p class="quiz-result-title quiz-result-title-failed">不正解！</p>' +
    `<p>${answerBoxArray[i]}</p>` +
    `<p>${explanationText[i]}</p>` +
    `<img class="quiz-image" src="${images[i]}">` +
    "</div>" +
    "</div>";

  //↓ 上でつくったquiz_divというidがつけられたdivをkuizy.htmlのquizDivWrapperというidがつけられたdivのなかにぶちこんでいる。beforeend！！
  quizDivWrapper.insertAdjacentHTML("beforeend", articles);
}

//正解のボタン押したときの表示変更や回答ボックスの表示
function show_answer_correct(quiz_num) {
  let correctAnswer = document.getElementById(`correctAnswerQ${quiz_num}`);
  let correctPop = document.getElementById(`correctPopQ${quiz_num}`);
  correctAnswer.classList.add("succeeded");
  correctPop.classList.add("quiz-result");
  correctPop.classList.remove("hidden_message_correct");

  let optionList = document.getElementById(`optionList${quiz_num}`);
  optionList.style.pointerEvents = "none";
}
//1つ目の不正解のボタン押したときの表示変更や回答ボックスの表示
function show_answer_wrong_1(quiz_num) {
  let correctAnswer = document.getElementById(`correctAnswerQ${quiz_num}`);
  let wrongAnswer = document.getElementById(`wrongAnswerQ${quiz_num}_1`);
  let wrongPop = document.getElementById(`wrongPopQ${quiz_num}`);
  wrongAnswer.classList.add("failed");
  correctAnswer.classList.add("succeeded");
  wrongPop.classList.add("pop_up_wrong");
  wrongPop.classList.remove("hidden_message_wrong");

  let optionList = document.getElementById(`optionList${quiz_num}`);
  optionList.style.pointerEvents = "none";
}
//2つ目の不正解のボタン押したときの表示変更や回答ボックスの表示
function show_answer_wrong_2(quiz_num) {
  let correctAnswer = document.getElementById(`correctAnswerQ${quiz_num}`);
  let wrongAnswer = document.getElementById(`wrongAnswerQ${quiz_num}_2`);
  let wrongPop = document.getElementById(`wrongPopQ${quiz_num}`);
  wrongAnswer.classList.add("failed");
  correctAnswer.classList.add("succeeded");
  wrongPop.classList.add("pop_up_wrong");
  wrongPop.classList.remove("hidden_message_wrong");

  let optionList = document.getElementById(`optionList${quiz_num}`);
  optionList.style.pointerEvents = "none";
//本体
  for (let i = 0; i < quizSet.length; i++) {
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
    for (let x = 0; x < 3; x++) {
      question_box = question_box +
        `<li id='${i}-${x}' onclick="onclickFunction(${i},${x})" >` + quizSet[i][x] + `</li>`
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
    document.getElementById('quiz-box').insertAdjacentHTML('beforeend', question_box);

    var onclickFunction = (question_number, clicked_number) => {
      //クリックした際に全て赤に変更
      let clicked_option = document.getElementById(question_number + "-" + clicked_number)
      clicked_option.classList.add("failed");
      //正解のボックスが青になるようにする（中身で判断）
      for (let p = 0; p < 3; p++) {
        if (quizSet[question_number][p] == true_answers[question_number]) {
          let true_choice = document.getElementById(question_number + "-" + p);
          true_choice.classList.add("succeeded");
          true_choice.classList.remove("failed");//先ほどの「クリックした際に全て赤に変更」を取り除く
        }
      }
      //全ての選択肢のクリック無効
      let choice0 = document.getElementById(question_number + "-0");
      let choice1 = document.getElementById(question_number + "-1");
      let choice2 = document.getElementById(question_number + "-2");
      choice0.style.pointerEvents = "none";
      choice1.style.pointerEvents = "none";
      choice2.style.pointerEvents = "none";
      //正解を選択したときの解説ブロックを表示
      if (quizSet[question_number][clicked_number] == true_answers[question_number]) {
        document.getElementById('ans-t-' + question_number).style.display = "block";
        document.getElementById('ul-' + question_number).scrollIntoView({ behavior: 'smooth', block: 'start' });
        //不正解を選択したときの解説ブロックを表示
      } else {
        document.getElementById('ans-f-' + question_number).style.display = "block";
        document.getElementById('ul-' + question_number).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
// console.log('a')
}
