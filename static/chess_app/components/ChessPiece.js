Vue.component('ChessPiece', {
    props: ['piece'],
    template: `
        <div class="chess-piece"
            :class="classObject"
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
        dragStart: function(event) {
            event.dataTransfer.setData('text/plain', this.piece.position);
            this.classObject['dragging'] = true
        },
        dragEnd: function() {
            this.classObject['dragging'] = true
        }
    }
});
