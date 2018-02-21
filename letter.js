
var Letter = function(letter) {
  this.letter = letter;
  this.value = false;

  this.printLetter = function() {
    if(this.letter == ' '){ 
      this.value = true;
      return '  ';
      //keeps it blank
    }if(this.value === false){ 
      return ' _ ';
    }
    //returns '_' 
    else{ 
      return this.letter;
    }
    //returns letter

  };
};

module.exports = Letter;


