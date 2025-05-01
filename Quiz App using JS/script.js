const questions=[
    {
        question:"Which event propagation phase triggers event handlers directly attached to the target?",
        answers:[
            {text:"Capturing Phase",correct:false},
            {text:"Bubbling Phase",correct:false},
            {text:"Target Phase", correct:true},
            {text:"None of the above",correct:false},

        ]
    },
    {
            question: "Which API is used to make asynchronous HTTP requests in modern JS?",
            answers: [
                { text: "XMLHttpRequest (Legacy)", correct: false },
                { text: "fetch() (Modern Promise-based API)", correct: true },
                { text: "$.ajax() (jQuery method)", correct: false },
                { text: "http.request() (Node.js only)", correct: false }
            ]
    },
    {
        question: "What does this code log?\n\njavascript\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
        answers: [
            { text: "1 2 3 4", correct: false },
            { text: "1 4 2 3", correct: false },
            { text: "1 4 3 2", correct: true },
            { text: "4 1 3 2", correct: false }
        ]
    },
    {
        question: "How do you check if a variable is an array?",
        answers: [
            { text: "typeof arr === \"array\"", correct: false },
            { text: "arr.isArray()", correct: false },
            { text: "Array.isArray(arr)", correct: true },
            { text: "arr.typeOf() === \"array\"", correct: false }
        ]
    },
    {
        question: "What will be logged when this code executes?\n\nconsole.log(typeof (() => {}));",
        answers: [
            { text: "\"function\"", correct: true },
            { text: "\"object\"", correct: false },
            { text: "\"arrow\"", correct: false },
            { text: "undefined", correct: false }
            ]
    },
    {
        question: "What is the output of this closure example? \n\nfunction outer() { \n  let x = 5; \n  return function inner() { \n    return x++;\n  };\n}\nconst fn = outer();\nconsole.log(fn(), fn());",
            answers: [
                { text: "5 6", correct: true },
                { text: "6 7", correct: false },
                { text: "5 5", correct: false },
                { text: "undefined undefined", correct: false }
            ]
        },
        {
            question: "Which method prevents both default behavior and event propagation?",
            answers: [
                { text: "event.stopPropagation()", correct: false },
                { text: "event.preventDefault()", correct: false },
                { text: "event.stopImmediatePropagation()", correct: false },
                { text: "return false (in jQuery event handlers)", correct: true }
            ]
        },
        {
            question: "What does this code output?\n\nconst arr = [1, 2, 3];\narr[10] = 10;\nconsole.log(arr.length, arr[5]);",
            answers: [
                { text: "11 undefined", correct: true },
                { text: "10 10", correct: false },
                { text: "4 undefined", correct: false },
                { text: "Error", correct: false }
            ]
        },
        {
            question: "What is the value of 'this' in an arrow function?",
            answers: [
                { text: "The global object", correct: false },
                { text: "The object that owns the function", correct: false },
                { text: "The lexical context where it was defined", correct: true },
                { text: "Always undefined", correct: false }
            ]
        },
        {
            question: "What does Object.freeze() do?",
            answers: [
                { text: "Prevents new properties from being added", correct: true },
                { text: "Makes all properties writable", correct: false },
                { text: "Deep freezes nested objects", correct: false },
                { text: "Allows property deletion but not addition", correct: false }
            ]
        }
    ];


const questionElement=document.getElementById("question");
const answerbuttonElement=document.getElementById("answer-buttons");
const nextbutton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;


function startQuiz(){
        currentQuestionIndex=0;
        score=0;
        nextbutton.innerHTML="Next";
        showQuestion();
}


function showQuestion(){
        resetState();
        let currentQuestion=questions[currentQuestionIndex];
        let questionNo=currentQuestionIndex + 1;
        questionElement.innerHTML =questionNo + ". " +currentQuestion.question;
    
        currentQuestion.answers.forEach(answer =>{
            const button=document.createElement("button");
            button.innerHTML=answer.text;
            button.classList.add("btn");
            answerbuttonElement.appendChild(button);
            if(answer.correct){
                button.dataset.correct=answer.correct;
            }
            button.addEventListener("click",selectAnswer);
        });
    
}

function resetState(){
        nextbutton.style.display="none";
        while(answerbuttonElement.firstChild){
            answerbuttonElement.removeChild(answerbuttonElement.firstChild);
        }
}

    function selectAnswer(e){
        const selectedBtn=e.target;
        const isCorrect=selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerbuttonElement.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled=true;

        });
        nextbutton.style.display="block";
    }
function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML="Play Again";
    nextbutton.style.display="block";
}

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();

        }else{
            showScore();
        }
    }
    nextbutton.addEventListener("click",()=>{
        if(currentQuestionIndex< questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
    });
    startQuiz();



