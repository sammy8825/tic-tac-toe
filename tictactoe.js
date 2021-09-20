let playerChoice, AIChoice;

const X = document.querySelector(".X");
X.addEventListener("click", () => {
    playerChoice = "X";
    AIChoice = "O";
    document.querySelector(".option").style.display="none";
    document.querySelector("table").style.display="table";
});

const O = document.querySelector(".O");
O.addEventListener("click", () => {
    playerChoice = "O";
    AIChoice = "X";
    document.querySelector(".option").style.display="none";
    document.querySelector("table").style.display="table";
});


var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const huPlayer = "P";
const aiPlayer = "C";
var boxesFilled = 0;
var wins = 0, loses = 0, tie = 0;

const winning = function (board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}

const cells = document.querySelectorAll("td");

cells.forEach(cell => cell.addEventListener("click", () => {
    let cellClicked = document.querySelector("#" + cell.id);
    move(cellClicked, huPlayer, playerChoice);
}));

function move(element, player, color) {
    if (board[element.id] != "P" && board[element.id] != "C") {
        boxesFilled++;
        element.innerHTML = color
        board[element.id[element.id.length - 1]] = player;
        // console.log(board)
        if (winning(board, player)) {
            setTimeout(function () {
                wins += 1;
                document.querySelector(".score").innerHTML = `Wins: ${wins} | Losses: ${loses} | Ties: ${tie}`;
                alert("YOU WIN");
            }, 500);
            return;
        } else if (boxesFilled > 8) {
            setTimeout(function () {
                tie += 1;
                document.querySelector(".score").innerHTML = `Wins: ${wins} | Losses: ${loses} | Ties: ${tie}`;
                alert("IT'S A TIE");
            }, 500);
            return;
        } else {
            boxesFilled++;
            const index = minimax(board, aiPlayer).index;
            const selector = "#id-" + index;
            document.querySelector(selector).innerHTML = AIChoice;
            board[index] = aiPlayer;
            if (winning(board, aiPlayer)) {
                setTimeout(function () {
                    loses += 1;
                    document.querySelector(".score").innerHTML = `Wins: ${wins} | Losses: ${loses} | Ties: ${tie}`;
                    alert("YOU LOSE");
                }, 500);
                return;
            } else if (boxesFilled === 0) {
                setTimeout(function () {
                    tie += 1;
                    document.querySelector(".score").innerHTML = `Wins: ${wins} | Losses: ${loses} | Ties: ${tie}`;
                    alert("IT'S A TIE");
                }, 500);
                return;
            }
        }
    }
}

const minimax = function (reboard, player) {
    let array = avail(reboard);
    if (winning(reboard, huPlayer)) {
        return {
            score: -10
        };
    } else if (winning(reboard, aiPlayer)) {
        return {
            score: 10
        };
    } else if (array.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < array.length; i++) {
        var move = {};
        move.index = reboard[array[i]];
        reboard[array[i]] = player;

        if (player == aiPlayer) {
            var g = minimax(reboard, huPlayer);
            move.score = g.score;
        } else {
            var g = minimax(reboard, aiPlayer);
            move.score = g.score;
        }
        reboard[array[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

const avail = function (reboard) {
    return reboard.filter(s => s != "P" && s != "C");
}

const reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    playerChoice = undefined;
    AIChoice = undefined;
    document.querySelector(".option").style.display="block";
    document.querySelector("table").style.display="none";
    cells.forEach(cell => {
        document.querySelector("#" + cell.id).innerHTML = "";
    });
    boxesFilled = 0;
});