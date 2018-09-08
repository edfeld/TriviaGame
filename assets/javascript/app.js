// Trivia Game

// This code will run as soon as the page loads
window.onload = function() {
    // $("#lap").on("click", stopwatch.recordLap);
    $("#stop").on("click", stopwatch.stop);
    $("#reset").on("click", triviaGame.reset);
    // $("#start").on("click", stopwatch.start);
    $(".list-group-item").on("click", triviaGame.processGuess);
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
            correctAnswer: "Fank Oz",
        },
        { 
            questionNumber: 3,
            questionText: "Who played Long John Siver in 'Muppets Treasure Island'?",
            answers:  ["Michael Caine", "Tim Curry", "John Cleese"],
            correctAnswer: "Tim Curry",
        },
        { 
            questionNumber: 4,
            questionText: "What is the name of Kermit's nephew?",
            answers:  ["Robin", "Ajay", "Nevin"],
            correctAnswer: "Robin",
        }
    ],

    isGameStarted: false,
    wins: 0,
    losses: 0,
    QuestionIndex: 0,
    arrQuestionSize: 0,

    reset: function() {
        triviaGame.wins = 0;
        triviaGame.losses = 0;
        // this.questionText;
        triviaGame.arrQuestionSize = Object.keys(triviaGame.arrQuestion).length;
        console.log("44. QuestionIndex: " + triviaGame.QuestionIndex)
        console.log("45. arrQuestion size: " + triviaGame.arrQuestionSize);
        if ( beginAgain ) {
            triviaGame.QuestionIndex = 0;
        }
        // at the first question element - load the question set into the card
        if ( triviaGame.QuestionIndex < triviaGame.arrQuestionSize ) { 
            triviaGame.loadQuestionSet(triviaGame.QuestionIndex++); // Post increment
        }
             // start the timer method
             if (clockRunning) {
                 stopwatch.stop();
             }
             stopwatch.start();
            
        // onclick events in the answers list should interrupt the 

    },

    loadQuestionSet: function (element) {

        $("#answerList").empty();
        // load the question into the div
        $("#triviaQuestion").text(triviaGame.arrQuestion[element].questionText);

        $(".question-number").text(element + 1);
        
        let qAnswers = triviaGame.arrQuestion[element].answers; 

        // Append List item answers to the list 
        for(i=0; i < qAnswers.length; i++ ) {
            let ListItemQuest = $("<li>");
            ListItemQuest.addClass("list-group-item");
            ListItemQuest.text(qAnswers[i]);
            ListItemQuest.on("click", triviaGame.processGuess)
            $("#answerList").append(ListItemQuest);
        }
            
    },

    // findIndexbyQuestNum: function( questionNum) {
    //     triviaGame.arrQuestion.forEach(element => {
    //         if( triviaGame.arrQuestion[element].questionNumber === questionNum) { 
    //             return element; 
    //         }
    //         return -1;
    // });

    // },
    processGuess: function(){
        // Get the question number from the window
        let answerSelected = $(this).text();
        console.log("148 Answer Selected: " +answerSelected);

        let questionNum = parseInt($(".question-number").text(),10);
        questionNum--;  // decrement to get the arr index value. 
        
        // ToDo: Validate whether the correct answer is guessed 
        if (triviaGame.arrQuestion[questionNum].correctAnswer === answerSelected) {
            
            triviaGame.wins++;
            console.log("Correct answer!! Wins: " + triviaGame.wins);
        } else {
            triviaGame.losses++;
            console.log("Incorrect answer!! Loses: " + triviaGame.losses);
        }
        stopwatch.stop();
        if (triviaGame.QuestionIndex < triviaGame.arrQuestionSize) {
            stopwatch.start();
            triviaGame.loadQuestionSet(triviaGame.QuestionIndex++); // Post increment
        } else {
            console.log("129. game over");
            console.log("wins: " + triviaGame.wins);
            console.log("losses:  " + triviaGame.losses);
        }

        
    }

}

var stopwatch = {

    time: 0,

    start: function() {
  
      // DONE: Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        stopwatch.time= 31;
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
    // recordLap: function() {
  
    //   // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //   //       and save the result in a variable.
    //   var converted = stopwatch.timeConverter(stopwatch.time);
  
    //   // DONE: Add the current lap and time to the "laps" div.
    //   $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");
  
    //   // DONE: Increment lap by 1. Remember, we can't use "this" here.
    //   stopwatch.lap++;
    // },
    count: function() {
  
      // DONE: increment time by 1, remember we cant use "this" here.
      stopwatch.time--;
        
      if (stopwatch.time <= 0) {
          stopwatch.stop();
          alert("Time's up for this question!")
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

