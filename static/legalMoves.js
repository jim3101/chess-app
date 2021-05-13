import Move from '/static/move.js';


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


function isLegalPawnMove(positions, move) {
    const rank = getRankNumber(move.player, move.currentSquare);
    const file = getFileNumber(move.player, move.currentSquare);
    const targetRank = getRankNumber(move.player, move.targetSquare);
    const targetFile = getFileNumber(move.player, move.targetSquare);

    if (targetFile === file) {
        if (targetRank === (rank + 1) && squareIsFree(positions, move.targetSquare)) {
            return true;
        } else if (targetRank === (rank + 2) && rank === 2 && squareIsFree(positions, move.targetSquare)) {
            return true;
        }
    } else if (targetFile === (file + 1) || (targetFile === (file - 1))) {
        if (targetRank === (rank + 1) && opponentOccupiesSquare(move.player, positions, move.targetSquare)) {
            return true;
        } else {
            return false;
        }
    } 
    else {
        return false;
    }
}


function isLegalKingMove(positions, move) {
    const rank = getRankNumber(move.player, move.currentSquare);
    const file = getFileNumber(move.player, move.currentSquare);
    const targetRank = getRankNumber(move.player, move.targetSquare);
    const targetFile = getFileNumber(move.player, move.targetSquare);

    if (iOccupySquare(move.player, positions, move.targetSquare)) {
        return false;
    }

    if (targetFile === file || targetFile === (file + 1) || targetFile === (file - 1)) {
        if (targetRank === rank || targetRank === (rank + 1) || targetRank === (rank - 1)) {
            return true;
        }
    }

    return false;
}


function isCheck(positions, player) {
    const playersKingPosition = Object.keys(positions).find(field => positions[field]['color'] === player && positions[field]['type'] === 'king')

    for (const occupiedField in positions) {
        const currentPiece = positions[occupiedField];
        if (currentPiece.color != player) {
            const move = new Move(getOtherPlayer(player), currentPiece, occupiedField, playersKingPosition);
            if (canCaptureKing(positions, move)) {
                return true;
            }
        }
    }

    return false;
}


function willBeCheck(positions, move) {
    const positionsCopy = {...positions};
    delete positionsCopy[move.currentSquare];
    positionsCopy[move.targetSquare] = move.movingPiece;
    return isCheck(positionsCopy, move.player);
}


function canCaptureKing(positions, move) {
    if (move.movingPiece['color'] != move.player) {
        return false;
    }
    if (move.movingPiece['type'] === 'pawn') {
        return isLegalPawnMove(positions, move);
    } else if (move.movingPiece['type'] === 'king') {
        return isLegalKingMove(positions, move);
    }
}


export default function isLegalMove(positions, move) {
    if (move.movingPiece['color'] != move.player) {
        return false;
    }
    if (willBeCheck(positions, move)) {
        return false;
    }
    if (move.movingPiece['type'] === 'pawn') {   
        return isLegalPawnMove(positions, move);
    } else if (move.movingPiece['type'] === 'king') {
        return isLegalKingMove(positions, move);
    }
}
