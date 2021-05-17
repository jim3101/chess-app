import Chessboard from '/static/chessboard.js';
import { initialPositions } from '/static/constants.js';


let squares = document.getElementsByClassName('chessboard-square');
let initialPositionButton = document.getElementById('initial-position-button');

let chessboard = new Chessboard(squares, initialPositions);


initialPositionButton.addEventListener('click', () => {
    chessboard.setPositions(initialPositions);
    chessboard.setTurn('white');
});
