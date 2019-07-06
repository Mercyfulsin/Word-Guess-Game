//GLOBAL VARIABLES
var guesses, wins, losses, remainder, wordList, answer, alphabetArr, htmlArr, answerRemainder;
alphabetArr = ("abcdefghijklmnopqrstuvwxyz1234567890").split("");
wordList = ["ANAKIN", "DARTH VADER", "LUKE", "OBI-WAN", "C-3PO", "R2-D2", "CHEWBACCA", "HAN", "LEIA", "PADME", "QUI-GON", "EMPEROR", "YODA", "JAR JAR", "LANDO", "RED LEADER", "WEDGE", "BAIL ORGANA", "CAPTAIN PANAKA", "MACE WINDU", "NUTE GUNRAY", "BIGGS", "GOLD LEADER", "GENERAL GRIEVOUS", "TARKIN", "PIETT", "FODE/BEED", "RIC OLIE", "SHMI", "RUNE", "BOBA FETT", "OWEN", "ADMIRAL ACKBAR", "WATTO", "LAMA SU", "COUNT DOOKU", "GOLD FIVE", "RED TEN", "SIO BIBBLE", "JABBA", "MAD MADDA", "TAUN WE", "RIEEKAN", "CAPTAIN TYPHO", "ZEV", "DARTH MAUL", "BRAVO TWO", "JANGO FETT", "BOSS NASS", "GENERAL CEEL", "TEY HOW", "TC-14", "KITSTER", "RUWEE", "CLONE COMMANDER CODY", "CLONE COMMANDER GREE", "KI-ADI-MUNDI", "ODD BALL", "MON MOTHMA", "BERU", "DACK", "JANSON", "SEBULBA", "JIRA", "VALORUM", "WALD", "BRAVO THREE", "DOFINE", "TARPALS", "PK-4", "GREEDO", "CLIEGG", "SENATOR ASK AAK", "JOBAL", "ORN FREE TAA", "POGGLE", "SOLA", "SUN RIT", "PLO KOON", "FANG ZAR", "TION MEDON", "ON MEDON", "CAPTAIN ANTILLES", "GIDDEAN DANU", "MOTTI", "CAMIE", "DODONNA", "DERLIN", "OZZEL", "NEEDA", "BIB FORTUNA", "JERJERROD", "BOUSHH", "RABE", "REY", "POE", "SNAP", "GENERAL HUX", "SNOKE", "COLONEL DATOO", "KYLO REN", "JESS", "ELLO ASTY", "NIV LEK", "YOLO ZIFF", "FINN", "ADMIRAL STATURA", "CAPTAIN PHASMA", "MAZ", "BALA-TIK", "LIEUTENANT MITAKA", "UNKAR PLUTT", "LOR SAN TEKKA", "BB-8"];
answer = wordList[Math.floor(Math.random() * Math.floor(wordList.length))].toLowerCase();
answerArr = Array.from(answer);
console.log(answer.toLocaleString());
console.log("==========================");
console.log(alphabetArr.toLocaleString());
guesses = [];
htmlArr = [];
answerRemainder = answerArr.slice();
answerRemainder.forEach(function(content,index,obj){
    if(alphabetArr.indexOf(content) === -1){obj.splice(index,1);}
});
wins = 0;
losses = 0;
remainder = 9;

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
    $(".toast").toast();
    $("#myToast").on('hidden.bs.toast', function(){
        window.location.reload();
    });
});



$("#myToast").on('show.bs.toast', function(){
    console.log("testingSHOW");
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

function showCharacter(letter) {
    for (var i = 0; i < answerArr.length; i++) {
        if (answerArr[i] === letter) {
            var temp = htmlArr[i].childNodes;
            temp[0].innerHTML = letter;
        }
    }
    answerRemainder = answerRemainder.filter(function(content){
        return content !== letter;
    });
}


function updateStats() {
    // hWins.innerHTML = "Wins: " + this.wins;
    // hLosses.innerHTML = "Losses: " + losses;
    hRemainder.innerHTML = "Guesses Left: " + remainder;
    hGuesses.innerHTML = "Your guesses thus far: " + guesses.toLocaleString();
    // hAnswer.innerHTML = answer;
    if(answerRemainder.length === 0){
        alphabetArr = [];
        toastText[0].innerHTML = "You won!";
        $('.toast').toast('show');
    }else if(remainder <= 0){
        console.log("test");
        alphabetArr = [];
        toastText[0].innerHTML = "You lost!";
        $('.toast').toast('show');
    }
}

function generateHTML() {
    for (var i = 0; i < answerArr.length; i++) {
        //Create HTML elements
        //Block holds the letter and underscore
        var block = document.createElement("div");
        //underscore aesthetic
        var underscore = document.createElement('p');
        underscore.setAttribute("id", "underscore");
        underscore.innerHTML = "_";
        //space for ... spaces in names
        var spacebar = document.createElement('p');
        spacebar.setAttribute("id", "spacebar");
        spacebar.innerHTML = " ";
        //stores the individual char
        var letterBox = document.createElement('span');
        letterBox.setAttribute("id", "letterbox");
        // letterBox.textContent = answerArr[i];
        //give block an id for CSS
        block.setAttribute("id", "block");

        //Loops through answer to determine character or space
        if (alphabetArr.indexOf(answerArr[i]) === -1) {
            console.log("adding space bar & empty letterbox");
            block.appendChild(spacebar);
            htmlArr.push(block);
            // hWordArea.appendChild(block);
        } else {
            console.log("adding underscore & letterbox");
            block.appendChild(letterBox);
            block.appendChild(underscore);
            htmlArr.push(block);
            // hWordArea.appendChild(block);
        }
        htmlArr.forEach(function (content) {
            hWordArea.appendChild(content);
        });
    }
}