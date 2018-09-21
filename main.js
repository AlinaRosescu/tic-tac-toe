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
        $(this).html("<p>X</p>");
        $(this).css("color", "#09958d");
        gameGrid[selectedDivId] = "X";
        checkResults(player);
        if (checkResults) {
            movePlayer2(selectedDivId);
        }
    }
}

// check if selected div is available
function checkIsDivAvailable(div) {
    return gameGrid[div] === "E";
}

//check if either player has won, the game ends in a draw or game is still going
function checkResults(player) {
    var gameIsPlaying;

    winCases.forEach(function (element) {
        if (gameGrid[element[0]] === player && gameGrid[element[1]] === player && gameGrid[element[2]] === player) {
            gameIsPlaying = false;
            endGame(player);

            return gameIsPlaying;
        }
    })

    for (let i = 0; i < gameGrid.length; i++) {
        if (gameGrid[i] === "E") {
            gameIsPlaying = true;

            return gameIsPlaying;
        } else if (gameGrid[i] !== "E" && i === 8) {
            gameIsPlaying = false;
            endGame("It's a draw");

            return gameIsPlaying;
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
