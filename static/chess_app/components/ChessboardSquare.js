import { sendMove } from '../src/sendMove.js';
import Move from '../src/move.js';


Vue.component('ChessboardSquare', {
    props: ['squareData'],
    template: `
        <div class="chessboard-square"
             :class="classObject"
             @dragover="dragOver"
             @dragleave="dragLeave"
             @drop="drop">
            
             <ChessPiece 
                v-if="squareData.piece !== null"
                :piece="squareData.piece">
             </ChessPiece>
        </div>
    `,
    data: function() {
        return {
            draggable: true,
            classObject: {
                'dragged-over': false
            }
        }
    },
    methods: {
        dragOver: function(event) {
            event.preventDefault();
            this.classObject['dragged-over'] = true;
        },
        dragLeave: function() {
            this.classObject['dragged-over'] = false;
        },
        drop: function(event) {
            event.preventDefault();

            const dropData = event.dataTransfer.getData('text/plain');
            this.classObject['dragged-over'] = false;

            const fromSquare = dropData;
            const toSquare = this.squareData.id;

            const isMoveLegal = this.$root.$data.appState.movePiece(fromSquare, toSquare, true);

            if (isMoveLegal) {
                this.requestResponseMove(fromSquare, toSquare);
            }

            this.$root.$data.appState.clearLegalMoves();        
        },
        requestResponseMove: function(fromSquare, toSquare) {
            const move = new Move(fromSquare, toSquare);
            sendMove({ player: this.$root.$data.appState.getPlayer(), move: move, chessboardState: this.$root.$data.appState.getChessboardState() }).then((response) => {
                if (response.checkmate) {
                    console.log('checkmate!');
                    return;
                }
                this.$root.$data.appState.movePiece(response.move.old, response.move.new, false);
            });
        }
    }
});
