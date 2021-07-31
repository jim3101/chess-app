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
            this.$root.$data.appState.movePiece(dropData, this.squareData.id, true, true);
        }
    }
});
