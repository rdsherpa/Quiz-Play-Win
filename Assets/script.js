//selecting all reqired elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .time_left_sec");
const time_line = document.querySelector("header .time_line");

// if startQuiz button clicked
start_btn.onclick = ()=> {
  info_box.classList.add("activeInfo"); //show info box
}

// // if extQuiz button Clicked
exit_btn.onclick = ()=>{
  info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
  info_box.classList.remove("activeInfo") // hide info box
  quiz_box.classList.add("activeQuiz"); // show quiz box
  showQuestions(0); //calling showQuestion function
  queCounter(1); // passing 1 paramter to queCounter
  startTimer(15); // calling startTimer Function
  startTimerLine(0); //calling startTimerLine function
}

let timeValue = 15;
let que_count = 0; 
let userScore = 0;
let que_numb = 1;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); //show quiz box
  result_box.classList.remove("activeResult"); //hide result box
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  timeValue = 15;
  widthValue = 0;
  showQuestions(que_count); // calling showQuestions function
  queCounter(que_numb); //passing que_numb value to queCounter
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  startTimer(timeValue); //calling startTimer function
  startTimerLine(widthValue); //calling startTimerline function
  timeText.textContent = 'Time Left'; //change timetext to time left
  next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload(); // reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const buttom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
      if(que_count < questions.length -1){ // if question count is less than total question length
          que_count++; // increment the que_count value
          que_numb++; // increment the que_numb value
          showQuestions(que_count); //calling showQuestions function
          queCounter(que_numb); //passing que_numb value to queCounter
          clearInterval(counter); // clear counter
          clearInterval(counterLine); // clear counterLine
          startTimer(timeValue); //calling startTime function
          startTimerLine(widthValue); //calling startTimerLine function
          timeText.textContent = 'Time Left'; //change timetext to time left
          next_btn.classList.remove("show"); //hide the next button
      }else{
          clearInterval(counter); // clear counter
          clearInterval(counterLine); // clear counterLine
          ShowResult(); // calling ShowResult Function

      }
}


// getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    // creating a new span and div tag for question and option and passing the value using array index
    let que_tag = "<span>"+questions[index].numb+"."+questions[index].question+"</span>";
    let option_tag = "<div class= 'option'><span>"+questions[index].options[0]+"</span></div>"
    +"<div class='option'><span>"+questions[index].options[1]+"</span></div>"
    +"<div class='option'><span>"+questions[index].options[2]+"</span></div>"
    +"<div class='option'><span>"+questions[index].options[3]+"</span></div>";
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // setting onclick attribute to a available options 
    for(i=0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// creating the new div tags which for icons
let tickIconTag = "<div class='icon tick'><i class='fas fa-check'></i></div>";
let crossIconTag = "<div class='icon cross'><i class='fas fa-times'></i></div>";

// if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); // clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; // getting user Selected option;
    let correctAns = questions[que_count].answer; // getting correct answer from array
    let alloptions = option_list.children.length; // getting all option items
   

    if(userAns == correctAns){ // if user selected option is equal to array's correct answer
      userScore += 1; //upgrading score value with 1
      answer.classList.add("correct"); //adding green color to correct selected option
      answer.insertAjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
      console.log("Correct Answer");
      console.log("Your correct answers = "+ userScore);
    }else{
      answer.classList.add("incorrect"); //adding red color to correct selected option
      answer.insertAjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
      console.log("Wrong Answer");

      for(i = 0; i < alloptions; i++) {
        if(option_list.children[i].textContent == correctAns) { // if there is an option which is matched to an array answer
          option_list.children[i].setAttribute("class", "option correct"); // adding green color to matched option
          option_list.children[i].insertAjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Auto selected correct answer.");
        }
      }

    }

    for(i=0; i < alloptions; i++){
        option_list.children[i].classList.add("disabled"); // once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option

}

function showResult(){
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if(userScore >= 3) { // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
      let scoreTag = '<span>and congrats!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length+'</p></span>';
      score_text.innerHTML = scoreTag;
  }else if(userScore > 1){ // if user scored more than 1
      let scoreTag = '<span>and nice, You got <p>'+userScore +'</p> out of <p>'+questions.length+'</p></span>';
      scoreText.innerHTML = scoreTag; 

  }else{ // if user scored less than 1
      let scoreTag = '<span>and sorry, You got only <p>'+userScore +'</p> out of <p>'+questions.length+'</p></span>';
      scoreText.innerHTML = scoreTag;

  }
}

function startTimer(time){
      counter = setInterval(timer, 1000);
      function timer() {
        timeCount.textContent = time; // changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ // if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }

        if(time < 0) { // if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const alloptions = option_list.children.length; //getting all option items
            let correctAns = question[que_count].answer; //getting correct answer from array
            for(i = 0; i < alloptions; i++) {
              if(option_list.children[i].textContent == correctAns) { //if there is an option which is matched to an array answer
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAjacentHTML("beforeend", tickIconTag); //adding tick icon to match option
                console.log("Time off: Auto selected correct answer.");
              }
            }
            for(i=0; i < alloptions; i++){
              option_list.children[i].classList.add("disabled"); // once user select an option then disabled all options
          }
          next_btn.classList.add("show"); //show the next button if user selected any option
        }
            }
}



function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; // upgrading time value with 1
        time_line.style.width = time+"px"; // increasing width of time_line with px by time value
        if(time > 549){ //if time is greater than 549
          clearInterval(counterLine); // clear counterLine
        }
    }
}

function queCounter(index) {
  // creating a new span tag and passing the question number and total question
  let totalQueCountTag = '<span><p>'+index+'</p> of <p>' +questions.length+'</p Questions</span>';
  bottom_ques_counter.innerHTML = totalQueCountTag; // adding new span tag inside bottom_ques_counter
}

 
  
  


