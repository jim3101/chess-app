import initializeChessboard from './src/initializeChessboard.js';


const appState = {
    debug: true,
    state: {
        chessboardState: initializeChessboard(),
        legalMoves: []
    },
    movePiece: function(fromSquare, toSquare) {
        if (this.debug) console.log('moving piece from', fromSquare, 'to', toSquare);
        this.state.chessboardState[toSquare].piece = this.state.chessboardState[fromSquare].piece;
        this.state.chessboardState[fromSquare].piece = null;
    },
    setLegalMoves: function(legalMoves) {
        if (this.debug) console.log('setting legal moves:', legalMoves);
        
        this.state.legalMoves = legalMoves;

        for (const legalMove in legalMoves) {
            const legalSquareID = legalMoves[legalMove].new;
            this.state.chessboardState[legalSquareID].isLegalMove = 'legal-move';
        };
    },
    clearLegalMoves: function() {
        if (this.debug) console.log('clearing legal moves');

        for (const legalMove in this.state.legalMoves) {
            const legalSquareID = this.state.legalMoves[legalMove].new;
            this.state.chessboardState[legalSquareID].isLegalMove = 'illegal-move';
        };

        this.state.legalMoves = [];
    }
};


Vue.component('App', {
    template: `
        <div class="app">
            <Navbar></Navbar>
            <Chessboard :appState="appState"></Chessboard>
        </div>
    `,
    data: function() {
        return {
            appState: appState
        }
    }
});


const app = new Vue({
    el: '#app'
});
