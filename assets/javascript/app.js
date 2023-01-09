// Trivia Game


$(document).ready(function() {

  //  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
 

// clock is running variable
var clockRunning = false;

let triviaGame = {
    arrQuestion: [
        { 
            questionNumber: 1,
            questionText: "Animal, the Muppet drummer, was inspired which famous drummer?",
            answers:  ["Keith Moon", "Ringo Starr", "Buddy Rich", "Neil Peart"],
            correctAnswer: "Keith Moon"
        },
        { 
            questionNumber: 2,
            questionText: "Who played the hands of the Swedish Chef?",
            answers:  ["Jim Henson", "Walter Matheau", "Frank Oz"],
            correctAnswer: "Frank Oz"
        },
        { 
            questionNumber: 3,
            questionText: "Who played Long John Silver in 'Muppets Treasure Island'?",
            answers:  ["Michael Caine", "Tim Curry", "John Cleese"],
            correctAnswer: "Tim Curry"
        },
        { 
            questionNumber: 4,
            questionText: "What is the name of Kermit's nephew?",
            answers:  ["Robin", "Ajay", "Nevin", "Scooter"],
            correctAnswer: "Robin"
        },
        { 
            questionNumber: 5,
            questionText: "What role did Miss Piggy play in 'Muppets Treasure Island'?",
            answers:  ["The Inkeeper", "Mrs. Hawkins", "Mrs. Trelawney", "Benjamina Gunn"],
            correctAnswer: "Benjamina Gunn"
        },
        { 
            questionNumber: 6,
            questionText: "Dr. Teeth was the leader of the band call what?",
            answers:  ["Electric Shuffle", "Electric Company", "Electric Mayhem", "Electric Funk"],
            correctAnswer: "Electric Mayhem"
        }

    ],

    isGameStarted: false,
    wins: 0,
    losses: 0,
    QuestionIndex: 0,
    arrQuestionSize: 0,
    delayHideModal: 0, 

    endGame: function() {
        // load "Game over" into the div
        $("#triviaQuestion").text("  Your game is over.");
        // load the question number. 
        $(".question-number").text("");
        // load the period and space into the span
        $("#periodSpace").text("");
        // display the correct and incorrect answer counts
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
        // unhide the start button
        $("#reset").removeClass("invisible");
        // log end of game totals
        console.log("108. End of game!!")
        console.log("wins: " + triviaGame.wins);
        console.log("losses:  " + triviaGame.losses);
            
    },
    // Load the question sets  
    loadQuestionSet: function (element) {
        // empty the answer list 
        console.log("82 loadQuestionset started here.")
        $("#answerList").empty();
        // test to see if less that the total question count
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
            // load the period and space into the span.
            $("#periodSpace").text(". ");
            
            // Load the Answers array from the trivia game object
            let qAnswers = triviaGame.arrQuestion[element].answers; 

            // Append List item answers to the list 
            for(i=0; i < qAnswers.length; i++ ) {
                let ListItemQuest = $("<li>");
                ListItemQuest.addClass("list-group-item");
                ListItemQuest.text(qAnswers[i]);
                // ListItemQuest.on("click", triviaGame.processGuess)
                $("#answerList").append(ListItemQuest);
            }
        } else {
            // handle end game processing
            triviaGame.endGame();
        }
    },

    popModal: function( isHappy, correctAnswer) {
        if (isHappy){
            // display the modal dialog with the Happy GIF animation
            $('#HappyModalCenter').modal({ keyboard: false}); 
            console.log("118. Pop Happy Modal."); 
            $(".list-group-item").attr("item-disabled", "t"); // this is used to disable clicks
            // Use a timeout function to stop diplaying the modal
            triviaGame.delayHideModal = setTimeout(function() { 
                $('#HappyModalCenter').modal('hide'); 
                console.log("122. Happy Modal closed.");
                triviaGame.loadQuestionSet(triviaGame.QuestionIndex++);
            }, 5000);
        } else {
            // display the modal dialog with the Unhappy GIF animation
            $("#UnhappyModalCenterTitle").text("Incorrect!! The correct answer is " + correctAnswer + ".");
            $('#UnhappyModalCenter').modal({ keyboard: false});
            console.log("125. Pop Unhapy modal"); 
            $(".list-group-item").attr("item-disabled", "t"); // this is used to disable clicks
            // Use a timeout function to hide the modal
            triviaGame.delayHideModal = setTimeout(function() { 
                $('#UnhappyModalCenter').modal('hide'); 
                console.log("128. Unhappy Modal closed."); 
                triviaGame.loadQuestionSet(triviaGame.QuestionIndex++);
            }, 5000);
        } 
        
    },

    // This function is use to set up the game from scratch. 
    reset: function() {
        triviaGame.wins = 0;
        triviaGame.losses = 0;
        // Get the length of the array inside the object. 
        triviaGame.arrQuestionSize = Object.keys(triviaGame.arrQuestion).length;
        console.log("44. QuestionIndex: " + triviaGame.QuestionIndex)
        console.log("45. arrQuestion size: " + triviaGame.arrQuestionSize);
        
        triviaGame.QuestionIndex = 0;
        
        // At the first question element - load the question set into the card 
            triviaGame.loadQuestionSet(triviaGame.QuestionIndex++); // Post increment
            $("#reset").addClass("invisible"); // hide the start button. 
    },

    // display the time-out Modal
    timeOutPopModal: function( correctAnswer) {
            // Use the unhappy modal dialog
            $("#UnhappyModalCenterTitle").text("Time's up!!   The correct answer is " + correctAnswer + ".");
            $('#UnhappyModalCenter').modal('show');
            $(".list-group-item").attr("item-disabled", "t"); // used to prevent clicks
            triviaGame.delayHide = setTimeout(function() { 
                $('#UnhappyModalCenter').modal('hide');
                triviaGame.loadQuestionSet(triviaGame.QuestionIndex++);
            }, 5000);
    },

    // Function to return the correct answer. 
    getCorrectAnswer(){
        let questionNum = parseInt($(".question-number").text(),10);
        questionNum--; 
        return triviaGame.arrQuestion[questionNum].correctAnswer;
    },

    // Function to process the user guess.  
    processGuess: function(){
        // Get the question number from the window
        let answerSelected = $(this).text();
        let isDisabled = $(this).attr("item-disabled");
        if( typeof isDisabled == 'undefined'){
            stopwatch.stop();
            console.log("148 Answer Selected: " +answerSelected);
            let questionNum = parseInt($(".question-number").text(),10);
            questionNum--;  // decrement to get the arr index value. 
            
            // ToDo: Validate whether the correct answer is guessed 
            if (triviaGame.arrQuestion[questionNum].correctAnswer === answerSelected) {
                triviaGame.popModal(true);
                triviaGame.wins++;
                console.log("179. Correct answer!! Wins: " + triviaGame.wins);
            } else {
                triviaGame.popModal(false, triviaGame.arrQuestion[questionNum].correctAnswer);
                triviaGame.losses++;
                console.log("183. Incorrect answer!! Losses: " + triviaGame.losses);
            }

        }
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
      console.log("208. clockRunning: " + clockRunning);
      clearInterval(intervalId);
      clockRunning = false;
    },
    
    count: function() {
  
      // DONE: increment time by 1, remember we cant use "this" here.
      stopwatch.time--;
        
      // Test for 'time is up'. 
      if (stopwatch.time <= 0) {
        stopwatch.stop();
        triviaGame.losses++;
        triviaGame.timeOutPopModal( triviaGame.getCorrectAnswer());
        console.log("234. question not answered in time.  Loses: " + triviaGame.losses);   

      }
      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = stopwatch.timeConverter(stopwatch.time);
      console.log(converted);
  
      
      $("#display").text(converted);
    },
 
    //  Use the variable we just created to show the converted time in the "display" div.
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

    $("#stop").on("click", stopwatch.stop);
    $("#reset").on("click", triviaGame.reset);
    $(document).on("click", ".list-group-item", triviaGame.processGuess);

}); // doc.ready.fn()
