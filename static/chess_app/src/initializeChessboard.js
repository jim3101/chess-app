import { initialPositions } from '../constants.js';
import { isEven, isOdd } from './utils.js';


export default function initializeChessboard() {
    let chessboardState = {};
    for (let rank=8; rank>0; rank--) {
        for (let column=0; column<8; column++) {
            
            const file = String.fromCharCode('a'.charCodeAt(0) + column);
            const squareID = file + rank.toString();

            let piece = null;
            if (initialPositions.hasOwnProperty(squareID)) {
                piece = initialPositions[squareID];
            }

            if (piece !== null) {
                piece.setPosition(squareID);
            }

            const squareColor = (isEven(rank) && isEven(column) || isOdd(rank) && isOdd(column)) ? 'white' : 'black';

            chessboardState[squareID] = {
                id: squareID,
                color: squareColor,
                piece: piece,
                isLegalMove: 'illegal-move'
            };
        }
    }

    return chessboardState;
};
