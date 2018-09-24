var round;
var gameGrid = [];
var winCases = [
    ["0","1","2"],
    ["3","4","5"],
    ["6","7","8"],
    ["0","3","6"],
    ["1","4","7"],
    ["2","5","8"],
    ["2","4","6"],
    ["0","4","8"]
];


//initialize variables and add click event on grid
function startGame() {
    round = 1;

    $("#grid").empty();
    $(".result").empty();
    createGrid();
    $("#grid").on("click", "div", movePlayer1);
}

//create game 3x3 grid and set array with value E from empty
function createGrid() {
    $("#grid").css("display", "block");
    $("#start").css("display", "none");
    $("#restart").css("display", "block");
    for (let i = 0; i < 9; i++) {
        var square = document.createElement("div");
        document.getElementById("grid").appendChild(square);
        square.id = i;
        gameGrid[i] = "E";
    }
}

// register user clicks and moves
function movePlayer1() {
    var player = "X";
    var selectedDivId = $(this).attr("id");

    if(checkIsDivAvailable(selectedDivId)) {
        $(this).css("color", "#09958d");
        $(this).html("<p>X</p>");
        gameGrid[selectedDivId] = "X";
        var gameIsPlaying = checkResults(player);
        if (gameIsPlaying) {
            movePlayer2(selectedDivId);
        }
    }
}

//computer logic
function movePlayer2(userMove) {
    var userChoice = parseInt(userMove);
    var player = "O";
    var chosenDiv;
    var divId;

    if (round === 1 && userChoice !== 4) {
        divId = 4;
    } else if (round === 1 && userChoice === 4) {
        divId = getRandomNumber();
    } else {
        var player1 = "O";
        var player2 = "X";

        for (let i = 0; i < 2; i++) {
            divId = checkAvailableComputerMove(player1, player2,divId);
            if (!divId) {
                player1 = "X";
                player2 = "O";
            }
        }

        if (!divId)  {
            for (let i = 0; i < gameGrid.length; i++) {
                if (checkIsDivAvailable(i)) {
                divId = i;
            }
        }
    }

    chosenDiv = $(document.getElementById(divId));
    chosenDiv.css("color", "#fc2c54");
    chosenDiv.html("<p>0</p>").delay(800);
    gameGrid[divId] = "O";
    round++;
    checkResults(player);
}

//generate a random even number between 0 and 9
function getRandomNumber() {
    var randomNr;
    do {
        randomNr = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
        if (checkIsDivAvailable(randomNr) && randomNr % 2 === 0) {

            return randomNr;
        }
    } while (!checkIsDivAvailable(randomNr) || randomNr % 2 !== 0);
}

//check if computer can win or block
function checkAvailableComputerMove(player1,player2,divId) {
    winCases.forEach(function (item) {
        if (gameGrid[item[0]] === player1 && gameGrid[item[1]] === player1 &&  gameGrid[item[2]] !== player2) {
            divId = item[2];
        } else if (gameGrid[item[0]] === player1 && gameGrid[item[2]] === player1 &&  gameGrid[item[1]] !== player2) {
            divId = item[1];
        } else if (gameGrid[item[1]] === player1 && gameGrid[item[2]] === player1 &&  gameGrid[item[0]] !== player2) {
            divId = item[0];
        }
    });

    return divId;
}

// check if selected div is available
function checkIsDivAvailable(div) {
    return gameGrid[div] === "E";
}

//check if either player has won, the game ends in a draw or game is still going
function checkResults(player) {

    winCases.forEach(function (elem) {
        if (gameGrid[elem[0]] === player && gameGrid[elem[1]] === player && gameGrid[elem[2]] === player) {
            endGame(player);

            return false;
        }
    })

    for (let i = 0; i < gameGrid.length; i++) {
        if (gameGrid[i] === "E") {

            return true;
        } else if (gameGrid[i] !== "E" && i === 8) {
            endGame("It's a draw");

            return false;
        }
    }
}

//if game has ended alert the user of the result
function endGame(result) {
    $("#grid").off("click", "div");

    if (result === "X") {
       $(".result").css("color", "#09958d");
       $(".result").append("<p>" + result +" has won!</p>");
    } else if (result === "O") {
       $(".result").css("color", "#fc2c54");
       $(".result").append("<p>" + result +" has won!</p>");
    } else {
        $(".result").append("<p>" + result + "</p>");
        $(".result").css("color", "#076762");
    }
}
$(document).ready(function() {
        $(".container").on("click", "button", startGame);
    })
