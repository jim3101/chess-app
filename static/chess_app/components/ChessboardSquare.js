Vue.component('ChessboardSquare', {
    props: ['id', 'piece'],
    template: `
        <div class="chessboard-square"
             :class="classObject"
             @dragover="dragOver"
             @dragleave="dragLeave"
             @drop="drop">
            
             <ChessPiece 
                v-if="piece !== null"
                :piece="piece"></ChessPiece>
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
            console.log(dropData);
            console.log(this.id);
        }
    }
});
