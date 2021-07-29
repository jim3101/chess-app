import initializeChessboard from './src/initializeChessboard.js';


const store = {
    debug: true,
    state: {
        chessboardState: initializeChessboard()
    },
    movePiece: function(fromSquare, toSquare) {
        if (this.debug) console.log('moving piece from', fromSquare, 'to', toSquare);
        this.state.chessboardState[toSquare].piece = this.state.chessboardState[fromSquare].piece;
        this.state.chessboardState[fromSquare].piece = null;
    }
};


Vue.component('App', {
    template: `
        <div class="app">
            <Navbar></Navbar>
            <Chessboard :store="store"></Chessboard>
        </div>
    `,
    data: function() {
        return {
            store: store
        }
    }
});


const app = new Vue({
    el: '#app'
});
