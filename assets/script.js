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


//begins quiz
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

//loads question and creates a button for it
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


//ends quiz
function postScore() {
    clearInterval(timer);
    questionArea.innerHTML = "";
    titleArea.innerHTML = "Your Score Is " + currentScore;
}


//increments or decrements score based on answer selection
function ansClick(e) {
    if(qIndex >= (questions.length - 1)) {
      postScore();
    } else {
        var currentQuestion = questions[qIndex];
        var ansClick = e.target.textContent;
        if(ansClick.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            currentScore+= 5;
        } else {
            time -= 10;
            currentScore -= 5;
        }
        qIndex++;
        getQuestion();
    };
};

//adds click event to start button that initializes the quiz when clicked
startBtn.onclick = () => {
    startQuiz();
}
