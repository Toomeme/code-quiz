// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const timer = document.getElementById("timer");
const scoreDiv = document.getElementById("scoreContainer");
const formEl = document.getElementById("name-form");
const highScoreEl = document.getElementById("high-scores");
const scoreButtonsEl = document.getElementById("container");
const viewHighScore = document.getElementById("view-scores");
var loaded = 0;

var scores = [];

// create questions array
var questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "B"
    },{
        question : "What does JS stand for?",

        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        choiceD : "Wrong",
        correct : "C"
    }
];

// create variables

const lastQuestion = questions.length - 1;
var currentQuestion = 0;
var quizTime = 60; // 30s
var timeUpdate;

// render question
function renderQuestion(){
    var q = questions[currentQuestion];
    
    question.innerHTML = "<h1>"+ q.question +"</h1>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz button
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderTimer();
    timeUpdate = setInterval(renderTimer,1000); // render Timer every second
}


// timer render
function renderTimer(){
    if(quizTime > 0){
        
        timer.innerHTML = "Time:" + " " + quizTime;
        quizTime--;
        }else{
            // end the quiz and show the score
            clearInterval(timeUpdate);
            quizTime = 0;
            timer.innerHTML = "Time:" + " " + quizTime;
            gameOver();
        }
}

// check answer

function checkAnswer(answer){
    if( answer == questions[currentQuestion].correct){
        // answer is correct
        quizTime+= 5;
        renderTimer(); //make sure to update timer frequently so theres no discrepancy
        // change result color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change result color to red
        answerIsWrong();
        quizTime-= 10;
    }
    if(currentQuestion < lastQuestion){
        currentQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(timeUpdate);
        gameOver();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById('result').innerHTML = "<p class='result'>" + "Correct" + "</p>";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById('result').innerHTML = "<p class='result'>" + "Wrong" + "</p>";
}



var nameHandler = function(event) {
    if (loaded<1){
        loadScores();
    }
    event.preventDefault();
    var nameInput = document.querySelector("input[name='name']").value;
  
    // check if inputs are empty (validate)
    if (nameInput === "") {
      alert("You need to fill out the form!");
      return false;
    }
  
    // reset form fields for next name to be entered
    document.querySelector("input[name='name']").value = "";
  
      var scoreObj = {
        name: nameInput,
        score: quizTime
    }
    createScoreEl(scoreObj);
    // create score actions
    var scoreActionsEl = createScoreActions();
    highScoreEl.appendChild(scoreActionsEl);
  };

  var createScoreEl = function(scoreObj) {
    formEl.style.display = "none";
    scoreDiv.style.display = "none";
    highScoreEl.style.display = "block";
    var listItemEl = document.createElement("li");
    listItemEl.className = "score-item";
  
    var scoreInfoEl = document.createElement("div");
    scoreInfoEl.className = "score-info";
    scoreInfoEl.innerHTML = "<h3 class='score-name'>" + scoreObj.name + "</h3><span class='score-amount'>" + scoreObj.score + "</span>";
    listItemEl.appendChild(scoreInfoEl);
    highScoreEl.appendChild(listItemEl);
    scores.push(scoreObj);
    saveScores();
  };

  var createScoreActions = function() {
    // create container to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "score-actions";
  
    // create back button
    var backButtonEl = document.createElement("button");
    backButtonEl.textContent = "Go Back";
    backButtonEl.className = "btn back-btn";
    actionContainerEl.appendChild(backButtonEl);
    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Clear High Scores";
    deleteButtonEl.className = "btn delete-btn";
    actionContainerEl.appendChild(deleteButtonEl);

    return actionContainerEl;
  };

var saveScores = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
  }

var loadScores = function() {
    loaded ++;
    var savedScores = localStorage.getItem("scores");

    if (!savedScores) {
      return false;
    }
    savedScores = JSON.parse(savedScores);
  
      // loop through savedTasks array
    for (var i = 0; i < savedScores.length; i++) {
      // pass each task object into the `createTaskEl()` function
      createScoreEl(savedScores[i]);
    }
}

  var clearScores = function(){
    var scoreSelected = document.getElementsByClassName("score-item");
    while(scoreSelected[0]) {
        scoreSelected[0].remove();
    }
    localStorage.removeItem('scores');
    scores = [];
  }

  var resetQuiz = function(){
    location.reload();
  }

  var scoreButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
  
    if (targetEl.matches(".back-btn")) {
      resetQuiz();
    } else if (targetEl.matches(".delete-btn")) {
      clearScores();
    }
  };

//hs display

function showScores(){
    if (loaded<1){
        loadScores();
    }
    var scoreActionsEl = createScoreActions();
    highScoreEl.appendChild(scoreActionsEl);
    clearInterval(timeUpdate);
    timer.style.display = "none";
    quiz.style.display = "none";
    formEl.style.display = "none";
    scoreDiv.style.display = "none";
    start.style.display = "none";
    highScoreEl.style.display = "block";
}
  

// score render
function gameOver(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    formEl.style.display = "block";
    renderTimer(); //make sure to update timer frequently so theres no discrepancy
    var scoreDisplayEl = document.createElement("p");
    scoreDisplayEl.textContent = "Your score is" + " " + quizTime;
    scoreDisplayEl.className = "score-display";
    scoreDiv.appendChild(scoreDisplayEl);

}
// name entry
formEl.addEventListener("submit", nameHandler);

// for back and clear buttons
scoreButtonsEl.addEventListener("click", scoreButtonHandler);

// view high score
viewHighScore.addEventListener("click", showScores);

