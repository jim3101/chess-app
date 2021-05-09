class Chessboard {
    constructor(squareElements, initialPositions) {
        this.squareElements = squareElements;
        this.notation = 'off';
        this.positions = {};
        this.set_positions(initialPositions);
        this.render();
    }

    toggle_notation() {
        if (this.notation === 'off') {
            this.turn_on_notation();
            this.notation = 'on';
        } else if (this.notation === 'on') {
            this.turn_off_notation();
            this.notation = 'off';
        }
    }

    turn_off_notation() {
        Array.from(this.squareElements).forEach(square => {
            Array.from(square.children).forEach(childElement => {
                if (childElement.className === 'chessboard-square-text') {
                    square.removeChild(childElement);
                }
            })
        })
    }

    turn_on_notation() {
        Array.from(this.squareElements).forEach(square => {
            let p = document.createElement('DIV');
            p.classList.add('chessboard-square-text')
            p.innerHTML = square.id;
            square.appendChild(p);
        })
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
                p.textContent = this.positions[square.id];
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
                    delete this.positions[movingPiece.id];
                    this.positions[square.id] = movingPiece.textContent;
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


let initialPositions = {'a1': chessChars.white.rook, 'b1': chessChars.white.knight, 'c1': chessChars.white.bishop,
                        'd1': chessChars.white.queen, 'e1': chessChars.white.king, 'f1': chessChars.white.bishop,
                        'g1': chessChars.white.knight, 'h1': chessChars.white.rook, 'a2': chessChars.white.pawn,
                        'b2': chessChars.white.pawn, 'c2': chessChars.white.pawn, 'd2': chessChars.white.pawn,
                        'e2': chessChars.white.pawn, 'f2': chessChars.white.pawn, 'g2': chessChars.white.pawn,
                        'h2': chessChars.white.pawn,
                        'a8': chessChars.black.rook, 'b8': chessChars.black.knight, 'c8': chessChars.black.bishop,
                        'd8': chessChars.black.queen, 'e8': chessChars.black.king, 'f8': chessChars.black.bishop,
                        'g8': chessChars.black.knight, 'h8': chessChars.black.rook, 'a7': chessChars.black.pawn,
                        'b7': chessChars.black.pawn, 'c7': chessChars.black.pawn, 'd7': chessChars.black.pawn,
                        'e7': chessChars.black.pawn, 'f7': chessChars.black.pawn, 'g7': chessChars.black.pawn,
                        'h7': chessChars.black.pawn};


let squares = document.getElementsByClassName('chessboard-square');
let notationToggleButton = document.getElementById('notation-toggle-button');
let initialPositionButton = document.getElementById('initial-position-button');


let chessboard = new Chessboard(squares, initialPositions);

notationToggleButton.addEventListener('click', () => {
    chessboard.toggle_notation();
})

initialPositionButton.addEventListener('click', () => {
    chessboard.set_positions(initialPositions);
})
