import { initialPositions } from '../constants.js';
import { isEven, isOdd } from '../src/utils.js';


Vue.component('Chessboard', {
    template: `
        <div id="chessboard">
            <ChessboardSquare :class="[data.color]" v-for="data in chessboardArray" :piece="data.piece" :key="data.id">
            </ChessboardSquare>
        </div>
    `,
    data: function() {
        let chessboardArray = [];
        for (let rank=8; rank>0; rank--) {
            for (let column=0; column<8; column++) {
                
                const file = String.fromCharCode('a'.charCodeAt(0) + column);
                const squareID = file + rank.toString();

                let piece = '';
                if (initialPositions.hasOwnProperty(squareID)) {
                    piece = initialPositions[squareID].getChar();
                }

                chessboardArray.push({
                    id: file + rank.toString(),
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
