//require inquirer

var inquirer = require('inquirer');
var isLetter = require('is-letter');
//require objects/exports
var Word = require('./word.js');
var Game = require('./game.js');


//set the maxListener
// require('events').EventEmitter.prototype._maxListeners = 100;


var hangman = {
  wordBank: Game.newWord.wordList,
  guessesRemaining: 10,
  guessedLetters: [],
  currentWord: null,

  startGame: function() {
    var that = this;
    //clear guessed letters
    if(this.guessedLetters.length > 0){
      this.guessedLetters = [];
    }

    //prompt ready to play
    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Ready to play?"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else{
        console.log("Fine, I didn't want to play anyway..");
      }
    })},

  //yes to play start new game
  newGame: function() {
    if(this.guessesRemaining === 10) {
      console.log("\n                   ");
      console.log("Okay! Here we go!");
      console.log("\nHint: Harry Potter")
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      //picks random word
      var randNum = Math.floor(Math.random()*this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.populate();
      console.log("Current Word: " + this.currentWord.printWord());
      console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

      this.keepPrompting();
    } 
    else{
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 10;
  },
  keepPrompting : function(){
    var that = this;

    inquirer.prompt([{
      name: "userGuess",
      type: "input",
      message: "Choose a letter:",
      validate: function(exist) {
        if(isLetter(exist)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(letter) {
      //toUpperCase because words in word bank are all caps
      var letterGuessed = (letter.userGuess).toUpperCase();
      //checks if userGuess is already in guessed letters array
      var guessedAlready = false;
        for(var i = 0; i<that.guessedLetters.length; i++){
          if(letterGuessed === that.guessedLetters[i]){
            guessedAlready = true;
          }
        }
        //if letter is not in array do stuff. else tell user to guess again 
        if(guessedAlready === false){
          that.guessedLetters.push(letterGuessed);

          var found = that.currentWord.checkLetters(letterGuessed);
          //checks if wrong do stuff
          if(found === 0){
      		console.log("\n                   ");
          	console.log("You guessed WRONG.");
            that.guessesRemaining--;
            console.log('Guesses remaining: ' + that.guessesRemaining);

      		console.log("Current Word: " + that.currentWord.printWord());
			console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log("Letters guessed: " + that.guessedLetters);
      		console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

          } 
          // guess was right do stuffS
          else{
      		  console.log("\n                   ");
          	  console.log("You guessed RIGHT!");
              //if guess was rigt check if word is solved
              if(that.currentWord.solvedWord() === true){
                console.log("Current Word: " + that.currentWord.printWord());
                console.log('Congratulations! You won the game!!!');
              } 
              //word not solved yet do more stuff
              else{
                console.log("Guesses remaining: " + that.guessesRemaining);
                console.log("Current Word: " + that.currentWord.printWord());
      			console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                console.log("Letters guessed: " + that.guessedLetters);
      			console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

              }
          }
          //checks to keep prompting
          if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
            that.keepPrompting();
          }
          else if(that.guessesRemaining === 0){
            console.log('Game over!');
            console.log('The word you were guessing was: ' + that.currentWord.word);
          }
        } 

        else{
            console.log("You've guessed that letter already. Try again.")
            that.keepPrompting();
          }
    });
  }
}

hangman.startGame();

