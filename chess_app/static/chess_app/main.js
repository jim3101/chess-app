import Chessboard from './chessboard.js';
import { initialPositions } from './constants.js';


let chessboard = new Chessboard(document.getElementsByClassName('chessboard-square'), 
                                initialPositions, 
                                document.getElementById('turn-text'));


const initialPositionButton = document.getElementById('initial-position-button');
initialPositionButton.addEventListener('click', () => {
    chessboard.setTurn('white');
    chessboard.setPositions(initialPositions);
});


const flipBoardButton = document.getElementById('flip-board-button');
flipBoardButton.addEventListener('click', () => {
    const chessboardGrid = document.getElementById('chessboard');
    let chessboardChildren = Array.from(chessboardGrid.children);

    while (chessboardGrid.firstChild !== null) {
        chessboardGrid.removeChild(chessboardGrid.firstChild);
    }

    chessboardChildren.reverse();
    chessboardGrid.append(...chessboardChildren);
})
