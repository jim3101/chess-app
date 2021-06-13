import getLegalMoves from './legalMoves.js';
import { chessChars } from './constants.js';


export default class Chessboard {

    constructor(squareElements, initialPositions, turnTextField) {
        this.squareElements = squareElements;
        this.turnTextField = turnTextField;

        this.positions = {};
        this.turn = 'white';
        this.setPositions(initialPositions);
        
        this.legalEnPassant = null;
        this.enPassantTakes = null;
        this.selectedPieceLegalMoves = null;
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
        this.turnTextField.innerText = this.turn + "'s turn";
        this.setPieceEventListeners();
        this.setSquareEventListeners();
    }

    showLegalMoves(piece) {
        const currentPiece = this.positions[piece.id];
        this.selectedPieceLegalMoves = getLegalMoves(this.turn, currentPiece, piece.id, this.positions, null, true);
        this.selectedPieceLegalMoves.forEach(legalMove => {
            const square = document.getElementById(legalMove.newSquare);
            square.classList.add('legal-move');
        })
    }

    removeLegalMoves() {
        if (this.selectedPieceLegalMoves !== null) {
            this.selectedPieceLegalMoves.forEach(legalMove => {
                const square = document.getElementById(legalMove.newSquare);
                square.classList.remove('legal-move');
            })
        }
    }

    setPieceEventListeners() {
        let pieces = document.querySelectorAll('.chessboard-square-piece');
        Array.from(pieces).forEach(piece => {
            piece.addEventListener('mousedown', () => {
                this.showLegalMoves(piece);
            })

            piece.addEventListener('mouseup', () => {
                this.removeLegalMoves();
            })

            piece.addEventListener('mouseleave', () => {
                this.removeLegalMoves();
            })

            piece.addEventListener('dragstart', () => {
                piece.classList.add('dragging');
            })

            piece.addEventListener('dragend', () => {
                piece.classList.remove('dragging');
            })

            piece.addEventListener('dragover', () => {
                piece.parentElement.classList.add('dragging-over');
            })

            piece.addEventListener('dragleave', () => {
                piece.parentElement.classList.remove('dragging-over');
            })
        })
    }

    makeMove(square, movingPieceElement) {
        const currentSquare = movingPieceElement.id;
        const targetSquare = square.id;
        const movingPiece = this.positions[currentSquare];

        const move = this.selectedPieceLegalMoves.find(move => move.newSquare === targetSquare);
        if (move !== undefined) {
            delete this.positions[movingPieceElement.id];
            this.positions[targetSquare] = movingPiece;
            this.nextTurn();
            this.render();
        }
    }

    setSquareEventListeners() {
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
                this.removeLegalMoves();
                
                square.classList.remove('dragging-over');
                const movingPieceElement = document.querySelector('.chessboard-square-piece.dragging');
                
                if (movingPieceElement != null) {
                    movingPieceElement.classList.remove('dragging');

                    this.makeMove(square, movingPieceElement);
                }

                this.selectedPieceLegalMoves = null;
            })
        })
    }    
}
