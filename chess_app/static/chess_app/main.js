import Chessboard from '/static/chess_app/chessboard.js';
import { initialPositions } from './constants.js';


const squares = document.getElementsByClassName('chessboard-square');
const initialPositionButton = document.getElementById('initial-position-button');
const flipBoardButton = document.getElementById('flip-board-button');
const turnTextField = document.getElementById('turn-text');

let chessboard = new Chessboard(squares, initialPositions, turnTextField);


initialPositionButton.addEventListener('click', () => {
    chessboard.setTurn('white');
    chessboard.setPositions(initialPositions);
});


flipBoardButton.addEventListener('click', () => {
    const chessboardGrid = document.getElementById('chessboard');
    let chessboardChildren = Array.from(chessboardGrid.children);

    while (chessboardGrid.firstChild !== null) {
        chessboardGrid.removeChild(chessboardGrid.firstChild);
    }

    chessboardChildren.reverse();
    chessboardGrid.append(...chessboardChildren);
})
