Vue.component('Chessboard', {
    props: ['store'],
    template: `
        <div id="chessboard">

            <ChessboardSquare v-for="square in store.state.chessboardState" :key="square.id"
                              :class="[square.color]"     
                              :squareData="square"
                              :store="store">
            </ChessboardSquare>
        </div>
    `
});
