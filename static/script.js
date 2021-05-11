class Chessboard {

    constructor(squareElements, initialPositions) {
        this.squareElements = squareElements;
        this.positions = {};
        this.set_positions(initialPositions);
        this.turn = 'white';
    }

    set_positions(positionObject) {
        this.positions = {...positionObject};
        this.render();
    }

    clear_render() {
        Array.from(this.squareElements).forEach(square => {
            Array.from(square.children).forEach(childElement => {
                if (childElement.className === 'chessboard-square-piece') {
                    square.removeChild(childElement);
                }
            })
        })
    }

    render() {
        this.clear_render();
        Array.from(this.squareElements).forEach(square => {
            if (this.positions.hasOwnProperty(square.id)) {
                let p = document.createElement('DIV');
                p.classList.add('chessboard-square-piece')
                p.setAttribute('draggable', 'true');
                p.id = square.id;
                p.textContent = this.positions[square.id]['character'];
                console.log(p.textContent);
                square.appendChild(p);
            }
        })
        this.set_piece_callbacks();
    }

    set_piece_callbacks() {
        let pieces = document.querySelectorAll('.chessboard-square-piece');
        Array.from(pieces).forEach(piece => {
            piece.addEventListener('dragstart', () => {
                piece.classList.add('dragging');
            })

            piece.addEventListener('dragend', () => {
                piece.classList.remove('dragging');
            })
        })

        Array.from(this.squareElements).forEach(square => {
            square.addEventListener('dragenter', () => {
                square.classList.add('dragging-over');
            })

            square.addEventListener('dragleave', () => {
                square.classList.remove('dragging-over');
            })

            square.addEventListener('dragover', (e) => {
                e.preventDefault();
            })

            square.addEventListener('drop', (e) => {
                square.classList.remove('dragging-over');
                let movingPiece = document.querySelector('.chessboard-square-piece.dragging');
                if (movingPiece != null) {
                    movingPiece.classList.remove('dragging');
                    
                    const currentPiece = this.positions[movingPiece.id];
                    delete this.positions[movingPiece.id];

                    this.positions[square.id] = currentPiece;
                    this.render();
                }
            })
        })
    }
}


let whiteCharacters = {'king': String.fromCharCode(9812), 'queen': String.fromCharCode(9813), 'rook': String.fromCharCode(9814),
                   'bishop': String.fromCharCode(9815), 'knight': String.fromCharCode(9816), 'pawn': String.fromCharCode(9817)};
let blackCharacters = {'king': String.fromCharCode(9818), 'queen': String.fromCharCode(9819), 'rook': String.fromCharCode(9820),
                   'bishop': String.fromCharCode(9821), 'knight': String.fromCharCode(9822), 'pawn': String.fromCharCode(9823)};
let chessChars = {'white': whiteCharacters, 'black': blackCharacters};


let initialPositions = {'a1': {'type': 'rook', 'character': chessChars.white.rook}, 
                        'b1': {'type': 'knight', 'character': chessChars.white.knight}, 
                        'c1': {'type': 'bishop', 'character': chessChars.white.bishop},
                        'd1': {'type': 'queen', 'character': chessChars.white.queen}, 
                        'e1': {'type': 'king', 'character': chessChars.white.king}, 
                        'f1': {'type': 'bishop', 'character': chessChars.white.bishop},
                        'g1': {'type': 'knight', 'character': chessChars.white.knight}, 
                        'h1': {'type': 'rook', 'character': chessChars.white.rook}, 
                        'a2': {'type': 'pawn', 'character': chessChars.white.pawn},
                        'b2': {'type': 'pawn', 'character': chessChars.white.pawn}, 
                        'c2': {'type': 'pawn', 'character': chessChars.white.pawn}, 
                        'd2': {'type': 'pawn', 'character': chessChars.white.pawn},
                        'e2': {'type': 'pawn', 'character': chessChars.white.pawn}, 
                        'f2': {'type': 'pawn', 'character': chessChars.white.pawn}, 
                        'g2': {'type': 'pawn', 'character': chessChars.white.pawn},
                        'h2': {'type': 'pawn', 'character': chessChars.white.pawn},
                        'a8': {'type': 'rook', 'character': chessChars.black.rook}, 
                        'b8': {'type': 'knight', 'character': chessChars.black.knight}, 
                        'c8': {'type': 'bishop', 'character': chessChars.black.bishop},
                        'd8': {'type': 'queen', 'character': chessChars.black.queen}, 
                        'e8': {'type': 'king', 'character': chessChars.black.king}, 
                        'f8': {'type': 'bishop', 'character': chessChars.black.bishop},
                        'g8': {'type': 'knight', 'character': chessChars.black.knight}, 
                        'h8': {'type': 'rook', 'character': chessChars.black.rook}, 
                        'a7': {'type': 'pawn', 'character': chessChars.black.pawn},
                        'b7': {'type': 'pawn', 'character': chessChars.black.pawn}, 
                        'c7': {'type': 'pawn', 'character': chessChars.black.pawn}, 
                        'd7': {'type': 'pawn', 'character': chessChars.black.pawn},
                        'e7': {'type': 'pawn', 'character': chessChars.black.pawn}, 
                        'f7': {'type': 'pawn', 'character': chessChars.black.pawn}, 
                        'g7': {'type': 'pawn', 'character': chessChars.black.pawn},
                        'h7': {'type': 'pawn', 'character': chessChars.black.pawn}};

console.log(initialPositions);


let squares = document.getElementsByClassName('chessboard-square');
let initialPositionButton = document.getElementById('initial-position-button');


let chessboard = new Chessboard(squares, initialPositions);


initialPositionButton.addEventListener('click', () => {
    chessboard.set_positions(initialPositions);
});
