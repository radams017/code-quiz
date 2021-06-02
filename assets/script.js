var time = questions.length * 10;
var timer;

var qIndex = 0;
var currentScore = 0;

var startBtn = document.getElementById('start-btn');
var timeEl = document.getElementById('time');
var questionEl = document.getElementById('question');
var choicesEl = document.getElementById('choices');
var questionArea = document.getElementById('question-area');
var titleArea = document.getElementById('title-area');
var scoreArea = document.getElementById('score-area');

var localHS = localStorage.setItem("score", currentScore);


function startQuiz() {
    timer = setInterval(function() {
        time--;
        timeEl.textContent = time;
        if(time === 0) {
            postScore();
        }
    },
        1000);
    titleArea.textContent = "";
    getQuestion();
    startBtn.remove();

};

// function endQuiz() {
//     clearInterval(timer);
// };

function getQuestion() {
    var currentQuestion = questions[qIndex];
    questionEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";

    for(var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var newBtn = document.createElement("Button");
        newBtn.textContent = choice;
        choicesEl.appendChild(newBtn);
        newBtn.className = "new-button";
        newBtn.onclick = ansClick;
    }    
};

function postScore() {
    clearInterval(timer);
    questionArea.innerHTML = "";
    titleArea.innerHTML = "Your Score Is " + currentScore;
    postTable();
}

function postTable() {
    var newLine = document.createElement("p");
    newLine.textContent = localHS;
    scoreArea.appendChild(newLine);
}

function ansClick(e) {
    if(qIndex >= (questions.length - 1)) {
      postScore();
    } else {
        var currentQuestion = questions[qIndex];
        var ansClick = e.target.textContent;
        if(ansClick.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            currentScore++;
        } else {
            time -= 10;
        }
        qIndex++;
        getQuestion();
    };
};


startBtn.onclick = () => {
    startQuiz();
}
