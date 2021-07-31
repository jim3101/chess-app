import { requestLegalMoves } from '../src/sendMove.js';


Vue.component('ChessPiece', {
    props: ['piece', 'appState'],
    template: `
        <div class="chess-piece"
            :class="classObject"
            @mousedown="showLegalMoves"
            @mouseup="clearLegalMoves"
            @dragstart="dragStart"
            @dragend="dragEnd"
            draggable>

            {{ piece.char }}
        </div>
    `,
    data: function() {
        return {
            classObject: {
                'dragging': false
            }
        }
    },
    methods: {
        showLegalMoves: function(event) {
            const data = {player: 'white', piece: this.piece, chessboardState: this.appState.state.chessboardState};
            requestLegalMoves(data).then((legalMoves) => {
                this.appState.setLegalMoves(legalMoves.legalMoves);
            });
        },
        clearLegalMoves: function(event) {
            this.appState.clearLegalMoves();
        },
        dragStart: function(event) {
            event.dataTransfer.setData('text/plain', this.piece.position);
            this.classObject['dragging'] = true
        },
        dragEnd: function() {
            this.classObject['dragging'] = true
        }
    }
});
