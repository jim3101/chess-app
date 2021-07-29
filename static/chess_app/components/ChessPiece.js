import { requestLegalMoves } from '../sendMove.js';


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
            const data = {player: 'white', piece: {type: 'pawn'}, chessboardState: []};
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
