import { sendMove } from '../sendMove.js';


Vue.component('ChessboardSquare', {
    props: ['squareData', 'appState'],
    template: `
        <div class="chessboard-square"
             :class="classObject"
             @dragover="dragOver"
             @dragleave="dragLeave"
             @drop="drop">
            
             <ChessPiece 
                v-if="squareData.piece !== null"
                :piece="squareData.piece"
                :appState="appState"></ChessPiece>
        </div>
    `,
    data: function() {
        return {
            draggedOver: false,
            draggable: true,
            classObject: {
                'dragged-over': this.draggedOver
            }
        }
    },
    methods: {
        dragOver: function(event) {
            event.preventDefault();
            // this.draggedOver = true;
            this.classObject['dragged-over'] = true;
        },
        dragLeave: function() {
            // this.draggedOver = false;
            this.classObject['dragged-over'] = false;
        },
        drop: function(event) {
            event.preventDefault();
            this.appState.clearLegalMoves();

            const dropData = event.dataTransfer.getData('text/plain');
            this.classObject['dragged-over'] = false;
            this.appState.movePiece(dropData, this.squareData.id);
            // sendMove({hello: 'world!'}).then((response) => {
            //     console.log('response', response);
            // });
        },
        // onClick: function(event) {
        //     const squareID = this.squareData.id;
        //     console.log('click2', this.squareData.isLegalMove);
        // }
    }
});
