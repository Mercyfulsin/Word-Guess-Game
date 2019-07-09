
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
        playMusic("assets/sounds/end_title.ogg");
        alphabetArr = [];
        var newImage = $("<img>").attr("src", "assets/images/victory.gif");
        newImage.appendTo(toastText[0]);
        $(".mr-auto").text('You Won!');
        $('.toast').toast('show');
    }else if(remainder === 1 && audioElement.getAttribute("src") !== "assets/sounds/SW-Duel_Of_The_Fates.ogg"){
        playMusic("assets/sounds/SW-Duel_Of_The_Fates.ogg");
    }else if(remainder <= 0){
        alphabetArr = [];
        var randomNum = Math.round(Math.random());
        playMusic(loseSounds[randomNum]);
        var newImage = $("<img>").attr("src", loseGifs[randomNum]);
        newImage.appendTo(toastText[0]);
        $(".mr-auto").text('You Lost! Correct Answer: ' + answer);
        $('.toast').toast('show');
    }
}

function generateHTML() {
    var randomNum = Math.round(Math.random());
    console.log(randomNum);
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

function playMusic(src){
    audioElement.pause();
    audioElement.setAttribute("src", src);
    audioElement.load();
    audioElement.play();
}