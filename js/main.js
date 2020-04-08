/*----- constants -----*/

const playerOne = 'x';
const playerTwo = 'o';

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];


/*----- app's state (variables) -----*/

let gameBoard;
let whoseTurn = playerOne;
let winning;

/*----- cached element references -----*/

const boxes = Array.from(document.querySelectorAll('#boxes div'));
const message = document.querySelector('h3');

/*----- event listeners -----*/

document.getElementById('boxes').addEventListener('click', selectSpace);
document.getElementById('restart').addEventListener('click', init);

/*----- functions -----*/

init();

function whoWon() {
    let winner = null;
    winningCombos.forEach(function(combo, index){
        if (gameBoard[combo[0]] && gameBoard[combo[0]] === gameBoard[combo[1]] && gameBoard[combo[0]] === gameBoard[combo[2]]) winner = gameBoard[combo[0]];
    });
    return winner ? winner : gameBoard.includes('') ? null : 'tie';
}

function selectSpace(event){
    let index = boxes.findIndex(function(box) {
        return box === event.target;
    });
    gameBoard[index] = whoseTurn;
    whoseTurn = whoseTurn === playerOne ? playerTwo : playerOne;
    winning = whoWon();
    render();
}

function render(){
    gameBoard.forEach(function(indicate, index){
        boxes[index].textContent = indicate;
    });
    message.textContent = winning === 'tie' ? `you tied...!` : winning ? `${winning} wins!` : `it's ${whoseTurn}'s turn!`;
};


function init(){
    gameBoard = [ '', '', '', '', '', '', '', '', '' ];
    render();
}