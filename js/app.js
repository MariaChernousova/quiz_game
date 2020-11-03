let jsonQuestions = localStorage.getItem('Data');
let question = JSON.parse(jsonQuestions);
console.log(question);

const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.options-container');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');

let message = document.querySelector('.message');
let prize = document.querySelector('.prize');


let questionCounter = 0;
let curentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnsvers = 0;
let wrongAnsvers = 0;
let sumPrize = 0;

let delay = 0.15;
let mainPrize = 1000000;
let multiply = 2;
let firstPrize = 100;

function setAvailableQuestions(){
    const totalQuestion = question.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(question[i]);
    }
    console.log(availableQuestions);
}

function getNewQuestion(){
    // clearStatusClass(optionContainer);
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    // console.log(questionIndex);
    curentQuestion = questionIndex;
    questionText.innerHTML = curentQuestion.question;

    const indexRemove1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(indexRemove1,1);
    // console.log(questionIndex);
    // console.log(availableQuestions);

    console.log(curentQuestion.content)
    console.log(curentQuestion.correct)

    const optionLength = curentQuestion.content.length;
    for (let i = 0; i < optionLength; i++) {
        availableOptions.push(i);
    }
    let animationDelay = 0.2;
    for (let i = 0; i < optionLength; i++) {
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const indexRemove2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(indexRemove2,1);

        // console.log(optionIndex);
        // console.log(availableOptions);

        // const option = document.createElement('button');
        // option.innerHTML = curentQuestion.option[optionIndex];
        // option.id = optionIndex;
        // option.className = 'option';

        // clearStatusClass(document.querySelector);
        const option = document.querySelector('.option');
        option.innerHTML = curentQuestion.content[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + delay;
        optionContainer.appendChild(option);
        option.setAttribute('onclick', 'getResult(this)');
    }

    questionCounter++;

}

function getResult(element){
    const id = parseInt(element.id);
    if(id === curentQuestion.correct){
        element.classList.add('correct');
        console.log(true);
        correctAnsvers++;
        analiseResult(true);
        console.log(correctAnsvers);
    } else{
        element.classList.add('wrong');
        wrongAnsvers++;
        console.log(false);
        analiseResult(false);
    }
    unclickableOptions();
    
}
function analiseResult(result){
    if(result){
        if (sumPrize === 0) {
            sumPrize = firstPrize;
        } else {
            sumPrize *= multiply;
        }
        console.log('sumprize:' + sumPrize);

    } else {
        console.log('game over');
        quizResult();
    }
}

function quizOver(){
    quizBox.classList.add('hide');
    // if(sumPrize>=1000000){
    //     winBox.classList.remove('hide');
    // } else{
    //     resultBox.classList.remove('hide');
    // }
    homeBox.classList.remove('hide');
}

function quizResult() {
    if(sumPrize < mainPrize){
        message.innerHTML = 'Game over. Your prize is:' + sumPrize;
    } else {
        message.innerHTML = 'Congratulations! You won 1000000';
    }

}

// function clearStatusClass(element) {
//     element.classList.remove('correct')
//     element.classList.remove('wrong')
//   }

function unclickableOptions(){
    const optionLength = optionContainer.children.length;
    for (let i = 0; i < optionLength; i++) {
        optionContainer.children[i].classList.add('already-answered');
    }
}

function clearStatusClass() {
    const optionLength = optionContainer.children.length;
    for (let i = 0; i < optionLength; i++) {
        optionContainer.children[i].classList.remove('correct');
        optionContainer.children[i].classList.remove('wrong');
        optionContainer.children[i].classList.remove('already-answered');
        }
  }

function next(){
    if(questionCounter === question.length || sumPrize >= mainPrize || wrongAnsvers === 1){
        console.log('game over');
        quizOver();
        quizResult();


    } else{
        getNewQuestion();
        clearStatusClass();
    }
}
function start(){
    questionCounter = 0;
    correctAnsvers = 0;
    wrongAnsvers = 0;
    sumPrize = 0;
    clearStatusClass();
    getNewQuestion()


    homeBox.classList.add('hide');
    quizBox.classList.remove('hide');
}

function startNewGame(){
    message.innerHTML = 'Do you want to start?';
    questionCounter = 0;
    correctAnsvers = 0;
    wrongAnsvers = 0;
    sumPrize = 0;


    homeBox.classList.remove('hide');
    quizBox.classList.add('hide');
}

window.onload = function(){
    setAvailableQuestions();
    getNewQuestion();
    // quizResult()
    // console.log('sumriseAtTheEnd' + sumPrize);
}


