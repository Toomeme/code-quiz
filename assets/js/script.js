// select all elements
const start = document.getElementById("start-div");
const startButton = document.getElementById("start");
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

var loaded = 0; // track whether scores were loaded
var created = 0; //track whether action buttons are created
var scores = []; // score array init

// create questions array
var questions = [
    {
        question : "How do you create a function in JavaScript?",
        choiceA : "function = myFunction",
        choiceB : "Function()",
        choiceC : "funtion myFunction",
        choiceD : "myfunction()",
        correct : "A"
    },{
        question : "How to write an IF statement in JavaScript?",
        choiceA : "if i = 5",
        choiceB : "if i==5 then",
        choiceC : "if i = 5 then",
        choiceD : "if (i==5)",
        correct : "D"
    },{
        question : "How does a FOR loop start?",

        choiceA : "for i++ i = 0",
        choiceB : "for 5 i++",
        choiceC : "for (i = 0; i < 5; i++)",
        choiceD : "for i i++ i = 5",
        correct : "C"
    },{
        question : "How can you add a comment in a JavaScript?",

        choiceA : "/** this is a comment",
        choiceB : "//this is a comment",
        choiceC : "'this is a comment'",
        choiceD : "<-- this is a comment-->",
        correct : "B"
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
        quizTime+= 15;
        renderTimer(); //make sure to update timer frequently so theres no discrepancy
        // change result color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change result color to red
        answerIsWrong();
        quizTime-= 15;
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
    document.getElementById('result').style.display= "block";
    document.getElementById('result').innerHTML = "<p class='result'>" + "Correct!" + "</p>";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById('result').style.display= "block";
    document.getElementById('result').innerHTML = "<p class='result'>" + "Wrong!" + "</p>";
}

var nameHandler = function(event) {
    event.preventDefault();
    var nameInput = document.querySelector("input[name='name']").value;
  
    // check if inputs are empty (validate)
    if (nameInput === "") {
      alert("You need to enter your name!");
      return false;
    }
  
    // reset form fields for next name to be entered
    document.querySelector("input[name='name']").value = "";

    if (loaded<1){
        loadScores();
    }
  
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
    listItemEl.textContent = scoreObj.name + " - " + scoreObj.score;
    highScoreEl.appendChild(listItemEl);
    scores.push(scoreObj);
    saveScores();
  };

  var createScoreActions = function() {
    // create container to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "score-actions";
  
    // create back button
    var backButtonEl = document.createElement("div");
    backButtonEl.textContent = "Go Back";
    backButtonEl.className = "btn back-btn";
    actionContainerEl.appendChild(backButtonEl);
    // create delete button
    var deleteButtonEl = document.createElement("div");
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

//High score display

function showScores(){
    if (loaded<1){
        loadScores();
    }
    if (created<1){
    var scoreActionsEl = createScoreActions();
    highScoreEl.appendChild(scoreActionsEl);
    }
    clearInterval(timeUpdate);
    timer.style.display = "none";
    quiz.style.display = "none";
    formEl.style.display = "none";
    scoreDiv.style.display = "none";
    start.style.display = "none";
    highScoreEl.style.display = "block";
    created ++;
}
  

// score render
function gameOver(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    formEl.style.display = "block";
    renderTimer(); //make sure to update timer frequently so theres no discrepancy
    var gameOverEl = document.createElement("h1");
    gameOverEl.textContent = "All Done!";
    gameOverEl.className = "score-display";
    scoreDiv.appendChild(gameOverEl);
    var scoreDisplayEl = document.createElement("p");
    scoreDisplayEl.textContent = "Your final score is" + " " + quizTime;
    scoreDisplayEl.className = "score-display";
    scoreDiv.appendChild(scoreDisplayEl);

}

//start button
startButton.addEventListener("click",startQuiz);

// name entry
formEl.addEventListener("submit", nameHandler);

// for back and clear buttons
scoreButtonsEl.addEventListener("click", scoreButtonHandler);

// view high score
viewHighScore.addEventListener("click", showScores);


