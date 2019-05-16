var word = require("./Word");

var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var UnitedStates = [
    "alabama",   
    "alaska",
    "arizona",
    "arkansas",
    "california",
    "colorado",
    "connecticut",
    "district of columbia",
    "delaware",
    "florida",
    "georgia",
    "hawaii",
    "idaho",
    "illinois",
    "indiana",
    "iowa",
    "kansas",
    "kentucky",
    "louisiana",
    "maine",
    "maryland",
    "massachusetts",
    "michigan",
    "minnesota",
    "mississippi",
    "missouri",
    "montana",
    "nebraska",
    "nevada",
    "new hampshire",
    "new jersey",
    "new mexico",
    "new york",
    "north carolina",
    "north dakota",
    "ohio",
    "oklahoma",
    "oregon",
    "pennsylvania",
    "rhode island",
    "south carolina",
    "south dakota",
    "tennessee", 
    "texas",
    "utah",
    "vermont",
    "virginia",
    "washington",
    "west virginia",
    "wisconsin",
    "wyoming"
];

var randomIndex = Math.floor(Math.random() * UnitedStates.length);
var randomWord = UnitedStates[randomIndex];

var computerWord = new word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function theLogic() {
    if(requireNewWord) {
        var randomIndex = Math.floor(Math.random() * UnitedStates.length);
        var randomWord = UnitedStates[randomIndex];
        

        computerWord = new word(randomWord);

        requireNewWord = false;

        
    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    //if (guessesLeft > 0)

    if (wordComplete.includes(false)) {
        inquirer.prompt([
          {
            type: "input",
            message: "Select a letter from A to Z",
            name: "userinput"  
          }  
        ])
        .then(function(input){
            if (
                !letterArray.includes(input.userinput) ||
                input.userinput.length > 1
            ){
                console.log("\nPlease try again.\n");
                theLogic();
            }else {
                if (
                    incorrectLetters.includes(input.userinput) ||
                    correctLetters.includes(input.userinput) ||
                    input.userinput === ""
                ) {
                    console.log("\nAlready Guessed or Nothing was Entered");
                    theLogic();
                }else {
                    var wordCheckArray = [];

                    computerWord.userGuess(input.userinput);

                    computerWord.objArray.forEach(wordCheck);
                    if(wordCheckArray.join("") === wordComplete.join("")){
                        console.log("\nIncorrect\n");

                        incorrectLetters.push(input.userinput);
                        guessesLeft --;
                    } else {
                        console.log("\nCorrect\n");

                        correctLetters.push(input.userinput);
                        //added guessesLeft
                        guessesLeft --;
                        
                    }
                    computerWord.log();
                    

                    console.log("Guesses Left:  " + guessesLeft + "\n");

                    console.log("Letters Guessed:  " + incorrectLetters.join(" ") + "\n");

                    if(guessesLeft > 0) {
                        theLogic();
                    }else {
                        console.log("You have lost...\n");
                    }
                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                }
            }
        })
    }
    else {
        console.log("\nYou Win!\n");
    }
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}
function restartGame() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to:",
            choices: ["Play Again", "Exit"],
            name: "restart"
    
        }
    ])
    .then(function(input) {
        if (input.restart === "Play Again") {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            theLogic();
        } else {
            return;
        }
    });
}
theLogic();