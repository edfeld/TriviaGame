// Trivia Game

// This code will run as soon as the page loads
window.onload = function() {
    $("#stop").on("click", stopwatch.stop);
    $("#reset").on("click", triviaGame.reset);
  };


  //  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
  // variable that will control the restarts. 
let beginAgain = true;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

let triviaGame = {
    arrQuestion: [
        { 
            questionNumber: 1,
            questionText: "Animal, the Muppet drummer, was inspired which famous drummer?",
            answers:  ["Keith Moon", "Ringo Starr", "Buddy Rich", "Neil Peart"],
            correctAnswer: "Keith Moon",
        },
        { 
            questionNumber: 2,
            questionText: "Who played the hands of the Swedish Chef?",
            answers:  ["Jim Henson", "Walter Matheau", "Frank Oz"],
            correctAnswer: "Frank Oz",
        },
        { 
            questionNumber: 3,
            questionText: "Who played Long John Silver in 'Muppets Treasure Island'?",
            answers:  ["Michael Caine", "Tim Curry", "John Cleese"],
            correctAnswer: "Tim Curry",
        },
        { 
            questionNumber: 4,
            questionText: "What is the name of Kermit's nephew?",
            answers:  ["Robin", "Ajay", "Nevin", "Scooter"],
            correctAnswer: "Robin",
        }

    ],

    isGameStarted: false,
    wins: 0,
    losses: 0,
    QuestionIndex: 0,
    arrQuestionSize: 0,
    delayHide: 0, 

    endGame: function() {
        // load "Game over" into the div
        $("#triviaQuestion").text("  Your game is over.");
        // load the question number. 
        $(".question-number").text("");
        // load the period and space into the span
        $("#periodSpace").text("");
        let correctAnswers = "Correct answers: " + triviaGame.wins;
        let incorrectAnswers = "Incorrect answers: " + triviaGame.losses;
        let listItm1 = $("<li>");
        listItm1.addClass("list-group-item");
        listItm1.text(correctAnswers);
        $("#answerList").append(listItm1);

        let listItm2 = $("<li>");
        listItm2.addClass("list-group-item");
        listItm2.text(incorrectAnswers);
        $("#answerList").append(listItm2)

        $("#reset").removeClass("invisible");
        console.log("108. End of game!!")
        console.log("wins: " + triviaGame.wins);
        console.log("losses:  " + triviaGame.losses);
            
    },

    loadQuestionSet: function (element) {
        // empty the answer list 
        $("#answerList").empty();
        if ( element < triviaGame.arrQuestionSize ) { 
            if(clockRunning) {
                stopwatch.stop();
                stopwatch.start();
            } else {
                stopwatch.start();
            }
           
            // load the question into the div
            $("#triviaQuestion").text(triviaGame.arrQuestion[element].questionText);
            // load the question number. 
            $(".question-number").text(element + 1);
            // load the period and space into the span
            $("#periodSpace").text(". ");
            
            let qAnswers = triviaGame.arrQuestion[element].answers; 

            // Append List item answers to the list 
            for(i=0; i < qAnswers.length; i++ ) {
                let ListItemQuest = $("<li>");
                ListItemQuest.addClass("list-group-item");
                ListItemQuest.text(qAnswers[i]);
                ListItemQuest.on("click", triviaGame.processGuess)
                $("#answerList").append(ListItemQuest);
            }
        
        
        } else {
            triviaGame.endGame();
            
        }
           
    },

    popModal: function( isHappy, correctAnswer) {

        if (isHappy){
            $('#HappyModalCenter').modal('show');
            cdelayHide = setTimeout(function() { $('#HappyModalCenter').modal('hide'); }, 5000);
        } else {
            $("#UnhappyModalCenterTitle").text("Incorrect!! The correct answer is " + correctAnswer + ".");
            $('#UnhappyModalCenter').modal('show');
            triviaGame.delayHide = setTimeout(function() { $('#UnhappyModalCenter').modal('hide'); }, 5000);
        }
        
    },

    
    reset: function() {
        triviaGame.wins = 0;
        triviaGame.losses = 0;
        // this.questionText;
        triviaGame.arrQuestionSize = Object.keys(triviaGame.arrQuestion).length;
        console.log("44. QuestionIndex: " + triviaGame.QuestionIndex)
        console.log("45. arrQuestion size: " + triviaGame.arrQuestionSize);
        // if ( beginAgain ) {
            triviaGame.QuestionIndex = 0;
        // }
        // at the first question element - load the question set into the card
        if ( triviaGame.QuestionIndex < triviaGame.arrQuestionSize ) { 
            triviaGame.loadQuestionSet(triviaGame.QuestionIndex++); // Post increment
            $("#reset").addClass("invisible"); // disable the start button. 
        }

        
    },

    timeOutPopModal: function( correctAnswer) {

            $("#UnhappyModalCenterTitle").text("Time's up!!   The correct answer is " + correctAnswer + ".");
            $('#UnhappyModalCenter').modal('show');
            let delayHide = setTimeout(function() { $('#UnhappyModalCenter').modal('hide'); }, 5000);
        
    },

    
    getCorrectAnswer(){
        let questionNum = parseInt($(".question-number").text(),10);
        questionNum--; 
        return triviaGame.arrQuestion[questionNum].correctAnswer;
    },

    processGuess: function(){
        // Get the question number from the window
        let answerSelected = $(this).text();
        stopwatch.stop();
        console.log("148 Answer Selected: " +answerSelected);
        let questionNum = parseInt($(".question-number").text(),10);
        questionNum--;  // decrement to get the arr index value. 
        
        // ToDo: Validate whether the correct answer is guessed 
        if (triviaGame.arrQuestion[questionNum].correctAnswer === answerSelected) {
            triviaGame.popModal(true);
            triviaGame.wins++;
            console.log("Correct answer!! Wins: " + triviaGame.wins);
        } else {
            triviaGame.popModal(false, triviaGame.arrQuestion[questionNum].correctAnswer);
            triviaGame.losses++;
            console.log("Incorrect answer!! Losses: " + triviaGame.losses);
        }
        
        triviaGame.loadQuestionSet(triviaGame.QuestionIndex++); // Post increment
 
    }
      
}

var stopwatch = {

    time: 0,
    timeLimit: 21,

    start: function() {
  
      // DONE: Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        stopwatch.time= this.timeLimit;
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
      }
    },
    stop: function() {
  
      // DONE: Use clearInterval to stop the count here and set the clock to not be running.
      console.log("107. clockRunning: " + clockRunning);
      clearInterval(intervalId);
      clockRunning = false;
    },
    
    count: function() {
  
      // DONE: increment time by 1, remember we cant use "this" here.
      stopwatch.time--;
        
      if (stopwatch.time <= 0) {
        stopwatch.stop();
        triviaGame.losses++;
        triviaGame.timeOutPopModal( triviaGame.getCorrectAnswer());
        console.log("170. question not answered in time.  Loses: " + triviaGame.losses);   
        triviaGame.loadQuestionSet(triviaGame.QuestionIndex++); // Post increment

      }
      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = stopwatch.timeConverter(stopwatch.time);
      console.log(converted);
  
      
      $("#display").text(converted);
    },
    // timeChecker: function(t) {
    //     if (t <= 0) {

    //     }
    // },
    // DONE: Use the variable we just created to show the converted time in the "display" div.
    timeConverter: function(t) {
  
      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);
  
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
  
      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
  
      return minutes + ":" + seconds;
    }
  };

