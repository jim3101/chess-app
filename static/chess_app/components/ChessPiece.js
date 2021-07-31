import { requestLegalMoves } from '../src/sendMove.js';


Vue.component('ChessPiece', {
    props: ['piece'],
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
            const data = {player: this.$root.$data.appState.getPlayer(), piece: this.piece, chessboardState: this.$root.$data.appState.getChessboardState()};
            requestLegalMoves(data).then((legalMoves) => {
                this.$root.$data.appState.setLegalMoves(legalMoves.legalMoves);
            });
        },
        clearLegalMoves: function(event) {
            this.$root.$data.appState.clearLegalMoves();
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
