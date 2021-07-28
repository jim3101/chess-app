Vue.component('ChessboardSquare', {
    props: ['piece'],
    template: `
        <div class="chessboard-square">
            <div class="square-text" :draggable="draggable">
                {{ piece }}
            </div>
        </div>
    `,
    data: function() {
        return {
            draggable: true
        }
    }
});
