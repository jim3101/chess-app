Vue.component('Chessboard', {
    props: ['appState'],
    template: `
        <div id="chessboard">

            <ChessboardSquare v-for="square in appState.state.chessboardState" :key="square.id"
                              :class="[square.isLegalMove, square.color]"     
                              :squareData="square"
                              :appState="appState">
            </ChessboardSquare>
        </div>
    `
});
