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
                let movingPiece = document.querySelector('.chessboard-square-piece.dragging');
                if (movingPiece != null) {
                    movingPiece.classList.remove('dragging');
                    
                    const currentPiece = this.positions[movingPiece.id];
                    if (isLegalMove(this.turn, this.positions, currentPiece, square.id, movingPiece.id)) {
                        delete this.positions[movingPiece.id];
                        this.positions[square.id] = currentPiece;
                        this.render();
                        this.next_turn();
                    } else {
                        console.log('illegal move!');
                    }
                }
            })
        })
    }
}


function getOtherPlayer(player) {
    if (player === 'white') {
        return 'black';
    } else if (player === 'black') {
        return 'white';
    }
}


function squareIsFree(positions, squareCode) {
    return !positions.hasOwnProperty(squareCode);
}


function opponentOccupiesSquare(player, positions, squareCode) {
    if (squareIsFree(positions, squareCode)) {
        return false;
    } else {
        return !(positions[squareCode]['color'] === player);
    }
}


function iOccupySquare(player, positions, squareCode) {
    if (squareIsFree(positions, squareCode)) {
        return false;
    } else {
        return (positions[squareCode]['color'] === player);
    }
}


function getFileNumber(player, squareCode) {
    if (player === 'white') {
        return squareCode.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else if (player === 'black') {
        return 9 - (squareCode.charCodeAt(0) - 'a'.charCodeAt(0) + 1);
    }
}


function getRankNumber(player, squareCode) {
    if (player === 'white') {
        return Number(squareCode[1]);
    } else if (player === 'black') {
        return 9 - Number(squareCode[1]);
    }
}


function isLegalPawnMove(player, positions, targetSquare, currentSquare) {
    const rank = getRankNumber(player, currentSquare);
    const file = getFileNumber(player, currentSquare);
    const targetRank = getRankNumber(player, targetSquare);
    const targetFile = getFileNumber(player, targetSquare);

    if (targetFile === file) {
        if (targetRank === (rank + 1) && squareIsFree(positions, targetSquare)) {
            return true;
        } else if (targetRank === (rank + 2) && rank === 2 && squareIsFree(positions, targetSquare)) {
            return true;
        }
    } else if (targetFile === (file + 1) || (targetFile === (file - 1))) {
        if (targetRank === (rank + 1) && opponentOccupiesSquare(player, positions, targetSquare)) {
            return true;
        } else {
            return false;
        }
    } 
    else {
        return false;
    }
}


function isLegalKingMove(player, positions, targetSquare, currentSquare) {
    const rank = getRankNumber(player, currentSquare);
    const file = getFileNumber(player, currentSquare);
    const targetRank = getRankNumber(player, targetSquare);
    const targetFile = getFileNumber(player, targetSquare);

    if (iOccupySquare(player, positions, targetSquare)) {
        return false;
    }

    if (targetFile === file || targetFile === (file + 1) || targetFile === (file - 1)) {
        if (targetRank === rank || targetRank === (rank + 1) || targetRank === (rank - 1)) {
            return true;
        }
    }

    return false;
}


function isCheck(player, positions) {
    const playersKingPosition = Object.keys(positions).find(field => positions[field]['color'] === player && positions[field]['type'] === 'king')

    for (const occupiedField in positions) {
        const currentPiece = positions[occupiedField];
        if (currentPiece.color != player) {
            if (isLegalCheck(getOtherPlayer(player), positions, currentPiece, playersKingPosition, occupiedField)) {
                return true;
            }
        }
    }

    return false;
}


function willBeCheck(player, positions, movingPiece, targetSquare, currentSquare) {
    const positionsCopy = {...positions};
    delete positionsCopy[currentSquare];
    positionsCopy[targetSquare] = movingPiece;
    return isCheck(player, positionsCopy);
}


function isLegalMove(player, positions, movingPiece, targetSquare, currentSquare) {
    if (movingPiece['color'] != player) {
        return false;
    }
    if (willBeCheck(player, positions, movingPiece, targetSquare, currentSquare)) {
        return false;
    }
    if (movingPiece['type'] === 'pawn') {   
        return isLegalPawnMove(player, positions, targetSquare, currentSquare);
    } else if (movingPiece['type'] === 'king') {
        return isLegalKingMove(player, positions, targetSquare, currentSquare);
    }
}


function isLegalCheck(player, positions, movingPiece, targetSquare, currentSquare) {
    if (movingPiece['color'] != player) {
        return false;
    }
    if (movingPiece['type'] === 'pawn') {
        return isLegalPawnMove(player, positions, targetSquare, currentSquare);
    } else if (movingPiece['type'] === 'king') {
        return isLegalKingMove(player, positions, targetSquare, currentSquare);
    }
}


let whiteCharacters = {'king': String.fromCharCode(9812), 'queen': String.fromCharCode(9813), 'rook': String.fromCharCode(9814),
                   'bishop': String.fromCharCode(9815), 'knight': String.fromCharCode(9816), 'pawn': String.fromCharCode(9817)};
let blackCharacters = {'king': String.fromCharCode(9818), 'queen': String.fromCharCode(9819), 'rook': String.fromCharCode(9820),
                   'bishop': String.fromCharCode(9821), 'knight': String.fromCharCode(9822), 'pawn': String.fromCharCode(9823)};
let chessChars = {'white': whiteCharacters, 'black': blackCharacters};


let initialPositions = {'a1': {'color': 'white', 'type': 'rook'}, 
                        'b1': {'color': 'white', 'type': 'knight'}, 
                        'c1': {'color': 'white', 'type': 'bishop'},
                        'd1': {'color': 'white', 'type': 'queen'}, 
                        'e1': {'color': 'white', 'type': 'king'}, 
                        'f1': {'color': 'white', 'type': 'bishop'},
                        'g1': {'color': 'white', 'type': 'knight'}, 
                        'h1': {'color': 'white', 'type': 'rook'}, 
                        'a2': {'color': 'white', 'type': 'pawn'},
                        'b2': {'color': 'white', 'type': 'pawn'}, 
                        'c2': {'color': 'white', 'type': 'pawn'}, 
                        'd2': {'color': 'white', 'type': 'pawn'},
                        'e2': {'color': 'white', 'type': 'pawn'}, 
                        'f2': {'color': 'white', 'type': 'pawn'}, 
                        'g2': {'color': 'white', 'type': 'pawn'},
                        'h2': {'color': 'white', 'type': 'pawn'},
                        'a8': {'color': 'black', 'type': 'rook'}, 
                        'b8': {'color': 'black', 'type': 'knight'}, 
                        'c8': {'color': 'black', 'type': 'bishop'},
                        'd8': {'color': 'black', 'type': 'queen'}, 
                        'e8': {'color': 'black', 'type': 'king'}, 
                        'f8': {'color': 'black', 'type': 'bishop'},
                        'g8': {'color': 'black', 'type': 'knight'}, 
                        'h8': {'color': 'black', 'type': 'rook'}, 
                        'a7': {'color': 'black', 'type': 'pawn'},
                        'b7': {'color': 'black', 'type': 'pawn'}, 
                        'c7': {'color': 'black', 'type': 'pawn'}, 
                        'd7': {'color': 'black', 'type': 'pawn'},
                        'e7': {'color': 'black', 'type': 'pawn'}, 
                        'f7': {'color': 'black', 'type': 'pawn'}, 
                        'g7': {'color': 'black', 'type': 'pawn'},
                        'h7': {'color': 'black', 'type': 'pawn'}};


let squares = document.getElementsByClassName('chessboard-square');
let initialPositionButton = document.getElementById('initial-position-button');


let chessboard = new Chessboard(squares, initialPositions);


initialPositionButton.addEventListener('click', () => {
    chessboard.set_positions(initialPositions);
    chessboard.set_turn('white');
});
