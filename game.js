const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progresBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
score = 0;
questionCounter = 0;
availableQuestions = [];

let questions = [

   {
    question: "What does 'CSS' stand for?",
    choice1: "Castle style",
    choice2: "Cascading Stylesheet",
    choice3: "Cascading STylessite",
    answer: 2

   },
   {
    question: "Which of this is useful to a Frontend developer?",
    choice1: "Javascript",
    choice2: "Java",
    choice3: "Python",
    answer: 1

   },
   {
    question: "What does 'HTML' stand for?",
    choice1: "hypetype markup language",
    choice2: "HyperText Markup Language",
    choice3: "hytext makeup language",
    answer: 2

   },
   {
    question: "Is HTML a High Programming Language?",
    choice1: "Yes",
    choice2: "Maybe",
    choice3: "No",
    answer: 3
   },
   {
    question: "Which of this is a property of CSS?",
    choice1: "Document",
    choice2: "Justify-content",
    choice3: "ById",
    answer: 2
   }

   
];

// CONSTANTS
const CORRECT_BONUS = 2;
const MAX_QUESTIONS = 5;

startGame = () => {   
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    getNewQuestion();
};


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // GO TO END PAGE
        return window.location.assign("end.html");
    };

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // UPDATE PROGRESS BAR
    console.log(questionCounter/MAX_QUESTIONS);
    progresBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];

    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
       if(!acceptingAnswers) return;

       acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply  === 'correct') {
            incrementScore(CORRECT_BONUS);
        };

       selectedChoice.parentElement.classList.add(classToApply);
       
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
      
    });
});
incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};



startGame();
