import Move from '/static/move.js';
import { chessChars } from '/static/constants.js';


export default class Chessboard {

    constructor(squareElements, initialPositions) {
        this.squareElements = squareElements;
        this.positions = {};
        this.setPositions(initialPositions);
        this.turn = 'white';

        this.legalEnPassant = null;
        this.enPassantTakes = null;
    }

    setPositions(positionObject) {
        this.positions = {...positionObject};
        this.render();
    }

    setTurn(player) {
        this.turn = player;
    }

    nextTurn() {
        if (this.turn === 'white') {
            this.turn = 'black';
        } else if (this.turn === 'black') {
            this.turn = 'white';
        }
    }

    clearRender() {
        Array.from(this.squareElements).forEach(square => {
            Array.from(square.children).forEach(childElement => {
                if (childElement.className === 'chessboard-square-piece') {
                    square.removeChild(childElement);
                }
            })
        })
    }

    render() {
        this.clearRender();
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
        this.setPieceEventListeners();
    }

    setPieceEventListeners() {
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
                const movingPieceElement = document.querySelector('.chessboard-square-piece.dragging');
                
                if (movingPieceElement != null) {
                    movingPieceElement.classList.remove('dragging');
                    
                    const currentSquare = movingPieceElement.id;
                    const targetSquare = square.id;
                    const movingPiece = this.positions[currentSquare];
                    const move = new Move(this.turn, movingPiece, currentSquare, targetSquare);

                    if (move.isLegal(this.positions, this.legalEnPassant)) {
                        if (targetSquare === this.legalEnPassant) {
                            delete this.positions[this.enPassantTakes];
                        }
                        this.legalEnPassant = move.enablesEnPassant(this.positions);
                        this.enPassantTakes = move.getEnPassantTakes();

                        delete this.positions[movingPieceElement.id];
                        this.positions[targetSquare] = movingPiece;
                        this.render();
                        this.nextTurn();
                    }
                }
            })
        })
    }
}
