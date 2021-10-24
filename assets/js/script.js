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
    if(quizTime >= 0){
        
        timer.innerHTML = "Time:" + " " + quizTime;
        quizTime--;
        
        }else{
            // end the quiz and show the score
            clearInterval(timeUpdate);
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
    document.getElementById('result').style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById('result').style.backgroundColor = "#f00";
}

var saveScores = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
  }

var nameHandler = function(event) {
    event.preventDefault();
    var nameInput = document.querySelector("input[name='name']").value;
  
    // check if inputs are empty (validate)
    if (nameInput === "") {
      alert("You need to fill out the form!");
      return false;
    }
  
    // reset form fields for next task to be entered
    document.querySelector("input[name='name']").value = "";
  
      var scoreObj = {
        name: nameInput,
        score: quizTime
      }
  
      createScoreEl(scoreObj);
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
  
    // create task actions (buttons and select) for task
    highScoreEl.appendChild(listItemEl);
    scores.push(scoreObj);
    saveScores();
  };
  

// score render
function gameOver(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    formEl.style.display = "block";
    // score = time remaining
    const score = quizTime;
    renderTimer(); //make sure to update timer frequently so theres no discrepancy
    scoreDiv.innerHTML += "<p>"+ score +"</p>";
}
// name entry
formEl.addEventListener("submit", nameHandler);