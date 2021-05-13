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


export function isLegalMove(player, positions, movingPiece, targetSquare, currentSquare) {
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
