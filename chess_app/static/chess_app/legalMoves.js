import Piece from './piece.js'


class Move {
    constructor(pieceType, oldPosition, newPosition) {
        this.piece = pieceType;
        this.oldSquare = oldPosition;
        this.newSquare = newPosition;
    }
}


export default function getLegalMoves(player, piece, piecePosition, positions, previousMove, removeChecks) {
    if (player !== piece.color) {
        return [];
    }

    if (piece.type === 'pawn') {
        return getLegalPawnMoves(player, piecePosition, positions, removeChecks, previousMove);
    }

    if (piece.type === 'knight') {
        return getLegalKnightMoves(player, piecePosition, positions, removeChecks);
    }

    if (piece.type === 'bishop') {
        return getLegalBishopMoves(player, piecePosition, positions, removeChecks);
    }

    if (piece.type === 'rook') {
        return getLegalRookMoves(player, piecePosition, positions, removeChecks);
    }

    if (piece.type === 'queen') {
        return getLegalQueenMoves(player, piecePosition, positions, removeChecks);
    }

    if (piece.type === 'king') {
        return getLegalKingMoves(player, piecePosition, positions, removeChecks);
    }
}


function getLegalPawnMoves(player, piecePosition, positions, removeChecks, previousMove) {
    const rank = getRankNumber(player, piecePosition);
    const file = getFileNumber(player, piecePosition);
    let legalPawnMoves = [];

    const oneForward = getSquareCode(player, file, rank+1);
    if (squareIsFree(positions, oneForward)) {
        legalPawnMoves.push(new Move('pawn', piecePosition, oneForward));
    }

    const twoForward = getSquareCode(player, file, rank+2);
    if (rank === 2 && squareIsFree(positions, oneForward) && squareIsFree(positions, twoForward)) {
        legalPawnMoves.push(new Move('pawn', piecePosition, twoForward));
    }

    const takeLeft = getSquareCode(player, file-1, rank+1);
    if (opponentOccupiesSquare(player, positions, takeLeft)) {
        legalPawnMoves.push(new Move('pawn', piecePosition, takeLeft));
    }

    const takeRight = getSquareCode(player, file+1, rank+1);
    if (opponentOccupiesSquare(player, positions, takeRight)) {
        legalPawnMoves.push(new Move('pawn', piecePosition, takeRight));
    }

    if (removeChecks) {
        return removeCheckingMoves(legalPawnMoves, positions, player);
    } else {
        return legalPawnMoves;
    }
}


function getLegalKnightMoves(player, piecePosition, positions, removeChecks) {
    const rank = getRankNumber(player, piecePosition);
    const file = getFileNumber(player, piecePosition);
    let legalKnightMoves = [];

    const forwardLeft = getSquareCode(player, file-1, rank+2);
    legalKnightMoves = evaluateKnightMove(new Move('knight', piecePosition, forwardLeft), player, positions, legalKnightMoves);

    const forwardRight = getSquareCode(player, file+1, rank+2);
    legalKnightMoves = evaluateKnightMove(new Move('knight', piecePosition, forwardRight), player, positions, legalKnightMoves);

    const leftForward = getSquareCode(player, file-2, rank+1);
    legalKnightMoves = evaluateKnightMove(new Move('knight', piecePosition, leftForward), player, positions, legalKnightMoves);

    const rightForward = getSquareCode(player, file+2, rank+1);
    legalKnightMoves = evaluateKnightMove(new Move('knight', piecePosition, rightForward), player, positions, legalKnightMoves);

    const backwardLeft = getSquareCode(player, file-1, rank-2);
    legalKnightMoves = evaluateKnightMove(new Move('knight', piecePosition, backwardLeft), player, positions, legalKnightMoves);

    const backwardRight = getSquareCode(player, file+1, rank-2);
    legalKnightMoves = evaluateKnightMove(new Move('knight', piecePosition, backwardRight), player, positions, legalKnightMoves);

    const leftBackward = getSquareCode(player, file-2, rank-1);
    legalKnightMoves = evaluateKnightMove(new Move('knight', piecePosition, leftBackward), player, positions, legalKnightMoves);

    const rightBackward = getSquareCode(player, file+2, rank-1);
    legalKnightMoves = evaluateKnightMove(new Move('knight', piecePosition, rightBackward), player, positions, legalKnightMoves);

    if (removeChecks) {
        return removeCheckingMoves(legalKnightMoves, positions, player);
    } else {
        return legalKnightMoves;
    }
}


function evaluateKnightMove(move, player, positions, legalKnightMoves) {
    if (move.newSquare !== null && !iOccupySquare(player, positions, move.newSquare)) {
        legalKnightMoves.push(move);
    }
    return legalKnightMoves;
}


function getLegalBishopMoves(player, piecePosition, positions, removeChecks) {
    const rank = getRankNumber(player, piecePosition);
    const file = getFileNumber(player, piecePosition);
    let legalBishopMoves = [];

    const maxLeftUpDistance = Math.min(file, (9-rank));
    for (let i = 1; i < maxLeftUpDistance; i++) {
        const leftUp = getSquareCode(player, file-i, rank+i);
        if (leftUp !== null && !iOccupySquare(player, positions, leftUp)) {
            legalBishopMoves.push(new Move('bishop', piecePosition, leftUp));
            if (!squareIsFree(positions, leftUp)) {
                break;
            }
        } else {
            break;
        }
    }

    const maxRightUpDistance = Math.min((9-file), (9-rank));
    for (let i = 1; i < maxRightUpDistance; i++) {
        const rightUp = getSquareCode(player, file+i, rank+i);
        if (rightUp !== null && !iOccupySquare(player, positions, rightUp)) {
            legalBishopMoves.push(new Move('bishop', piecePosition, rightUp));
            if (!squareIsFree(positions, rightUp)) {
                break;
            }
        } else {
            break;
        }
    }

    const maxLeftDownDistance = Math.min(file, rank);
    for (let i = 1; i < maxLeftDownDistance; i++) {
        const leftDown = getSquareCode(player, file-i, rank-i);
        if (leftDown !== null && !iOccupySquare(player, positions, leftDown)) {
            legalBishopMoves.push(new Move('bishop', piecePosition, leftDown));
            if (!squareIsFree(positions, leftDown)) {
                break;
            }
        } else {
            break;
        }
    }

    const maxRightDownDistance = Math.min((9-file), rank);
    for (let i = 1; i < maxRightDownDistance; i++) {
        const rightDown = getSquareCode(player, file+i, rank-i);
        if (rightDown !== null && !iOccupySquare(player, positions, rightDown)) {
            legalBishopMoves.push(new Move('bishop', piecePosition, rightDown));
            if (!squareIsFree(positions, rightDown)) {
                break;
            }
        } else {
            break;
        }
    }

    if (removeChecks) {
        return removeCheckingMoves(legalBishopMoves, positions, player);
    } else {
        return legalBishopMoves;
    }
}


function getLegalRookMoves(player, piecePosition, positions, removeChecks) {
    const rank = getRankNumber(player, piecePosition);
    const file = getFileNumber(player, piecePosition);
    let legalRookMoves = [];

    for (let i = 1; i < (9-rank); i++) {
        const up = getSquareCode(player, file, rank+i);
        if (up !== null && !iOccupySquare(player, positions, up)) {
            legalRookMoves.push(new Move('rook', piecePosition, up));
            if (!squareIsFree(positions, up)) {
                break;
            }
        } else {
            break;
        }
    }

    for (let i = 1; i < (9-file); i++) {
        const right = getSquareCode(player, file+i, rank);
        if (right !== null && !iOccupySquare(player, positions, right)) {
            legalRookMoves.push(new Move('rook', piecePosition, right));
            if (!squareIsFree(positions, right)) {
                break;
            }
        } else {
            break;
        }
    }

    for (let i = 1; i < rank; i++) {
        const down = getSquareCode(player, file, rank-i);
        if (down !== null && !iOccupySquare(player, positions, down)) {
            legalRookMoves.push(new Move('rook', piecePosition, down));
            if (!squareIsFree(positions, down)) {
                break;
            }
        } else {
            break;
        }
    }

    for (let i = 1; i < file; i++) {
        const left = getSquareCode(player, file-i, rank);
        if (left !== null && !iOccupySquare(player, positions, left)) {
            legalRookMoves.push(new Move('rook', piecePosition, left));
            if (!squareIsFree(positions, left)) {
                break;
            }
        } else {
            break;
        }
    }

    if (removeChecks) {
        return removeCheckingMoves(legalRookMoves, positions, player);
    } else {
        return legalRookMoves;
    }
}


function getLegalQueenMoves(player, piecePosition, positions, removeChecks) {
    const legalBishopMoves = getLegalBishopMoves(player, piecePosition, positions);
    const legalRookMoves = getLegalRookMoves(player, piecePosition, positions);
    let legalQueenMoves = legalBishopMoves.concat(legalRookMoves);

    if (removeChecks) {
        return removeCheckingMoves(legalQueenMoves, positions, player);
    } else {
        return legalQueenMoves;
    }
}


function getLegalKingMoves(player, piecePosition, positions, removeChecks) {
    const rank = getRankNumber(player, piecePosition);
    const file = getFileNumber(player, piecePosition);

    let legalKingMoves = [];

    const up = new Move('king', piecePosition, getSquareCode(player, file, rank+1));
    legalKingMoves = evaluateKingMove(up, player, positions, legalKingMoves);

    const rightUp = new Move('king', piecePosition, getSquareCode(player, file+1, rank+1));
    legalKingMoves = evaluateKingMove(rightUp, player, positions, legalKingMoves);

    const right = new Move('king', piecePosition, getSquareCode(player, file+1, rank));
    legalKingMoves = evaluateKingMove(right, player, positions, legalKingMoves);

    const rightDown = new Move('king', piecePosition, getSquareCode(player, file+1, rank-1));
    legalKingMoves = evaluateKingMove(rightDown, player, positions, legalKingMoves);

    const down = new Move('king', piecePosition, getSquareCode(player, file, rank-1));
    legalKingMoves = evaluateKingMove(down, player, positions, legalKingMoves);

    const leftDown = new Move('king', piecePosition, getSquareCode(player, file-1, rank-1));
    legalKingMoves = evaluateKingMove(leftDown, player, positions, legalKingMoves);

    const left = new Move('king', piecePosition, getSquareCode(player, file-1, rank));
    legalKingMoves = evaluateKingMove(left, player, positions, legalKingMoves);

    const leftUp = new Move('king', piecePosition, getSquareCode(player, file-1, rank+1));
    legalKingMoves = evaluateKingMove(leftUp, player, positions, legalKingMoves);

    if (removeChecks) {
        return removeCheckingMoves(legalKingMoves, positions, player);
    } else {
        return legalKingMoves;
    }
}


function evaluateKingMove(move, player, positions, legalKingMoves) {
    if (move.newSquare !== null && !iOccupySquare(player, positions, move.newSquare)) {
        legalKingMoves.push(move);
    }
    return legalKingMoves;
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


function getSquareCode(player, file, rank) {
    if (file <= 0 || file > 8 || rank <= 0 || rank > 8) {
        return null;
    }
    if (player === 'white') {
        const fileCode = String.fromCharCode(file - 1 + 'a'.charCodeAt(0));
        const rankCode = rank.toString();
        return fileCode + rankCode;
    } else if (player === 'black') {
        const fileCode = String.fromCharCode(8 - file + 'a'.charCodeAt(0));
        const rankCode = (9 - rank).toString();
        return fileCode + rankCode;
    }
}   


function removeCheckingMoves(legalMoves, positions, player) {
    let legalMovesWithoutChecks = [];

    legalMoves.forEach(move => {
        if (!willBeCheck(move, positions, player)) {
            legalMovesWithoutChecks.push(move);
        }
    })

    return legalMovesWithoutChecks
}


function willBeCheck(move, positions, player) {
    const positionsCopy = {...positions};
    delete positionsCopy[move.oldSquare];
    positionsCopy[move.newSquare] = new Piece(player, move.piece);
    return isCheck(positionsCopy, player);
}


function isCheck(positions, player) {
    const playersKingPosition = Object.keys(positions).find(field => positions[field]['color'] === player && positions[field]['type'] === 'king')
    for (const occupiedField in positions) {
        const currentPiece = positions[occupiedField];
        if (currentPiece.color != player) {
            const legalMoves = getLegalMoves(getOtherPlayer(player), currentPiece, occupiedField, positions, null, false);
            if (legalMoves.find(move => move.newSquare === playersKingPosition)) {
                return true;
            }
        }
    }
    return false;
}
