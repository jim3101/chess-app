Vue.component('Chessboard', {
    template: `
        <div id="chessboard">

            <ChessboardSquare v-for="square in chessboardState" :key="square.id"
                              :class="[square.isLegalMove, square.color]"     
                              :squareData="square">
            </ChessboardSquare>
        </div>
    `,
    data: function() {
        return {
            chessboardState: this.$root.$data.appState.getChessboardState()
        }
    }
});
