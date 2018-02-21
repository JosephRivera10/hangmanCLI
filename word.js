
var Letter = require('./letter.js');

function Word(word) {
  var that = this;
  this.word = word;
  this.letters = [];
  this.wordFound = false;

  //populate word
  this.populate = function() {
    for(var i = 0; i<that.word.length; i++){
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  //soved word
  this.solvedWord = function() {
    if(this.letters.every(function(lttr){
      return lttr.value === true;
    })){
      this.wordFound = true;
      return true;
    }

  };

  this.checkLetters = function(guessedLetter) {
    var index = 0;
    this.letters.forEach(function(lttr){
      if(lttr.letter === guessedLetter){
        lttr.value = true;
        index++;
      }
    })
   return index;
  };

  this.printWord = function() {
    var display = '';
    that.letters.forEach(function(lttr){
      var currentLetter = lttr.printLetter();
      display+= currentLetter;
    });

    return display;
  };
}

module.exports = Word;

