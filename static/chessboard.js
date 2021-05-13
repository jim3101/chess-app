import Move from '/static/move.js';
import isLegalMove from '/static/legalMoves.js';
import { chessChars } from '/static/constants.js';


export default class Chessboard {

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

    set_turn(player) {
        this.turn = player;
    }

    next_turn() {
        if (this.turn === 'white') {
            this.turn = 'black';
        } else if (this.turn === 'black') {
            this.turn = 'white';
        }
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
                
                const currentPiece = this.positions[square.id];
                p.textContent = chessChars[currentPiece.color][currentPiece.type];
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
                let movingPieceElement = document.querySelector('.chessboard-square-piece.dragging');
                
                if (movingPieceElement != null) {
                    movingPieceElement.classList.remove('dragging');
                    
                    const currentSquare = movingPieceElement.id;
                    const targetSquare = square.id;
                    const movingPiece = this.positions[currentSquare];
                    const move = new Move(this.turn, movingPiece, currentSquare, targetSquare);

                    if (isLegalMove(this.positions, move)) {
                        delete this.positions[movingPieceElement.id];
                        this.positions[targetSquare] = movingPiece;
                        this.render();
                        this.next_turn();
                    }
                }
            })
        })
    }
}
