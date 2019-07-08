//GLOBAL VARIABLES
var guesses, wins, losses, remainder, wordList, answer, alphabetArr, htmlArr, answerRemainder, audioElement;

//Split string into array (Generating alphanumeric options)
alphabetArr = ("abcdefghijklmnopqrstuvwxyz1234567890").split("");
//Characters to choose from
wordList = ["ANAKIN", "DARTH VADER", "LUKE", "OBI-WAN", "C-3PO", "R2-D2", "CHEWBACCA", "HAN", "LEIA", "PADME", "QUI-GON", "EMPEROR", "YODA", "JAR JAR", "LANDO", "RED LEADER", "WEDGE", "BAIL ORGANA", "CAPTAIN PANAKA", "MACE WINDU", "NUTE GUNRAY", "BIGGS", "GOLD LEADER", "GENERAL GRIEVOUS", "TARKIN", "PIETT", "FODE/BEED", "RIC OLIE", "SHMI", "RUNE", "BOBA FETT", "OWEN", "ADMIRAL ACKBAR", "WATTO", "LAMA SU", "COUNT DOOKU", "GOLD FIVE", "RED TEN", "SIO BIBBLE", "JABBA", "MAD MADDA", "TAUN WE", "RIEEKAN", "CAPTAIN TYPHO", "ZEV", "DARTH MAUL", "BRAVO TWO", "JANGO FETT", "BOSS NASS", "GENERAL CEEL", "TEY HOW", "TC-14", "KITSTER", "RUWEE", "CLONE COMMANDER CODY", "CLONE COMMANDER GREE", "KI-ADI-MUNDI", "ODD BALL", "MON MOTHMA", "BERU", "DACK", "JANSON", "SEBULBA", "JIRA", "VALORUM", "WALD", "BRAVO THREE", "DOFINE", "TARPALS", "PK-4", "GREEDO", "CLIEGG", "SENATOR ASK AAK", "JOBAL", "ORN FREE TAA", "POGGLE", "SOLA", "SUN RIT", "PLO KOON", "FANG ZAR", "TION MEDON", "ON MEDON", "CAPTAIN ANTILLES", "GIDDEAN DANU", "MOTTI", "CAMIE", "DODONNA", "DERLIN", "OZZEL", "NEEDA", "BIB FORTUNA", "JERJERROD", "BOUSHH", "RABE", "REY", "POE", "SNAP", "GENERAL HUX", "SNOKE", "COLONEL DATOO", "KYLO REN", "JESS", "ELLO ASTY", "NIV LEK", "YOLO ZIFF", "FINN", "ADMIRAL STATURA", "CAPTAIN PHASMA", "MAZ", "BALA-TIK", "LIEUTENANT MITAKA", "UNKAR PLUTT", "LOR SAN TEKKA", "BB-8"];
//Randomly choose from wordList for this page instance's answer
answer = wordList[Math.floor(Math.random() * Math.floor(wordList.length))].toLowerCase();
//Converts the answer into an array, each index holding 1 character
answerArr = Array.from(answer);
console.log(answer.toLocaleString());
//Initializing empty array to hold user guess attempts and array of html elements for displaying the game
guesses = [];
htmlArr = [];
//Make a copy of answerArr using slice (using = in JS actually references same obj in memory)
answerRemainder = answerArr.slice();
//Remove any non alphanumeric characters in the name
answerRemainder.forEach(function(content,index,obj){
    if(alphabetArr.indexOf(content) === -1){obj.splice(index,1);}
});
//Wins and Losses are still WIP (maybe won't even implement it.)
//Remainder is a counter for wrong entries a user can input
wins = 0;
losses = 0;
remainder = 9;
//Create an audio element to play music
audioElement = document.createElement("audio");
audioElement.setAttribute("src", "assets/sounds/theme.ogg");
audioElement.setAttribute("id", "songs");
//HTML Variables
var hWins, hLosses, hRemainder, hGuesses, hAnswer, hWordArea, hUnderscoreArea,toastText;
// hWins = document.getElementById("wins");
// hLosses = document.getElementById("losses");
hRemainder = document.getElementById("remainder");
hGuesses = document.getElementById("guesses");
// hAnswer = document.getElementById("answer");
hWordArea = document.getElementById("wordArea");
hUnderscoreArea = document.getElementById("underscoreArea");
toastText = document.getElementsByClassName("toast-body");
generateHTML();

$(document).ready(function(){
    $("#myToast").on('hidden.bs.toast', function(){
        window.location.reload();
    });
    $("#sw-logo").on("click", function(){
        if($(this).attr("is-playing") === "false"){
        audioElement.play();
        $(this).attr("is-playing","true");
    }else{
        audioElement.pause();
        $(this).attr("is-playing","false");
    }
    });
    console.log(audioElement.getAttribute("src"));
});

// Captures keyboard input. Depending on the letter pressed it will "call" (execute) different functions.
document.onkeyup = function (event) {
    // Captures the key press, converts it to lowercase, and saves it to a variable.
    var letter = event.key.toLowerCase();
    if (alphabetArr.indexOf(letter) === -1) {
    } else if (answerArr.indexOf(letter) === -1) {
        remainder--;
        guesses.push(letter);
        alphabetArr.splice(alphabetArr.indexOf(letter), 1);
        updateStats();
    } else {
        guesses.push(letter);
        alphabetArr.splice(alphabetArr.indexOf(letter), 1);
        showCharacter(letter);
        updateStats();
    }
};
