import { initialPositions } from '../constants.js';
import { isEven, isOdd } from '../src/utils.js';


Vue.component('Chessboard', {
    template: `
        <div id="chessboard">

            <ChessboardSquare v-for="data in chessboardArray"
                :id="data.id"
                :class="[data.color]" 
                :piece="data.piece"
                :key="data.id">
            </ChessboardSquare>
        </div>
    `,
    data: function() {
        let chessboardArray = [];
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

                chessboardArray.push({
                    id: squareID,
                    color: (isEven(rank) && isEven(column) || isOdd(rank) && isOdd(column)) ? 'white' : 'black',
                    piece: piece
                })
            }
        }

        return {
            chessboardArray: chessboardArray
        }
    }
});
