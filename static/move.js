export default class Move {
    constructor(player, movingPiece, currentSquare, targetSquare) {
        this.player = player;
        this.movingPiece = movingPiece;
        this.currentSquare = currentSquare;
        this.targetSquare = targetSquare;

        this.rank = getRankNumber(this.player, this.currentSquare);
        this.file = getFileNumber(this.player, this.currentSquare);
        this.targetRank = getRankNumber(this.player, this.targetSquare);
        this.targetFile = getFileNumber(this.player, this.targetSquare);
    }

    isLegal(positions) {
        if (this.movingPiece['color'] != this.player) {
            return false;
        }
        if (this.movingPiece['type'] === 'pawn') {   
            if (!this.isLegalPawnMove(positions)) {
                return false;
            }
        } else if (this.movingPiece['type'] === 'knight') {
            if (!this.isLegalKnightMove(positions)) {
                return false;
            }
        } else if (this.movingPiece['type'] === 'bishop') {
            if (!this.isLegalBishopMove(positions)) {
                return false;
            }
        } else if (this.movingPiece['type'] === 'king') {
            if (!this.isLegalKingMove(positions)) {
                return false;
            }
        }

        if (this.willBeCheck(positions)) {
            return false;
        }

        return true;
    }

    isLegalPawnMove(positions) {
        if (this.targetFile === this.file) {
            if (this.targetRank === (this.rank + 1) && squareIsFree(positions, this.targetSquare)) {
                return true;
            } else if (this.targetRank === (this.rank + 2) && this.rank === 2 && 
                       squareIsFree(positions, this.targetSquare) && 
                       squareIsFree(positions, getSquareCode(this.player, this.targetFile, this.rank+1))) {
                return true;
            }
        } else if (this.targetFile === (this.file + 1) || (this.targetFile === (this.file - 1))) {
            if (this.targetRank === (this.rank + 1) && opponentOccupiesSquare(this.player, positions, this.targetSquare)) {
                return true;
            } else {
                return false;
            }
        } 
        else {
            return false;
        }
    }

    isLegalKnightMove(positions) {
        if (((this.targetFile === (this.file + 1) && this.targetRank === (this.rank + 2)) ||
            (this.targetFile === (this.file + 1) && this.targetRank === (this.rank - 2)) || 
            (this.targetFile === (this.file + 2) && this.targetRank === (this.rank + 1)) ||
            (this.targetFile === (this.file + 2) && this.targetRank === (this.rank - 1)) ||
            (this.targetFile === (this.file - 1) && this.targetRank === (this.rank + 2)) ||
            (this.targetFile === (this.file - 1) && this.targetRank === (this.rank - 2)) ||
            (this.targetFile === (this.file - 2) && this.targetRank === (this.rank + 1)) ||
            (this.targetFile === (this.file - 2) && this.targetRank === (this.rank - 1))) &&
            !iOccupySquare(this.player, positions, this.targetSquare)) {
            return true;
        } else {
            return false;
        }
    }

    isLegalBishopMove(positions) {
        if (Math.abs(this.targetFile - this.file) === Math.abs(this.targetRank - this.rank) && 
            !iOccupySquare(this.player, positions, this.targetSquare)) {
            const fileTravelDistance = this.targetFile - this.file;
            const rankTravelDistance = this.targetRank - this.rank;
            for (let i = 1; i < Math.abs(fileTravelDistance); i++) {
                const inBetweenFile = this.file + (i * (fileTravelDistance / Math.abs(fileTravelDistance)));
                const inBetweenRank = this.rank + (i * (rankTravelDistance / Math.abs(rankTravelDistance)));
                const inBetweenSquareCode = getSquareCode(this.player, inBetweenFile, inBetweenRank);
                if (!squareIsFree(positions, inBetweenSquareCode)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    
    isLegalKingMove(positions) {
        if (iOccupySquare(this.player, positions, this.targetSquare)) {
            return false;
        }
    
        if (this.targetFile === this.file || this.targetFile === (this.file + 1) || 
            this.targetFile === (this.file - 1)) {
            if (this.targetRank === this.rank || this.targetRank === (this.rank + 1) || 
                this.targetRank === (this.rank - 1)) {
                return true;
            }
        }
    
        return false;
    }

    willBeCheck(positions) {
        const positionsCopy = {...positions};
        delete positionsCopy[this.currentSquare];
        positionsCopy[this.targetSquare] = this.movingPiece;
        return isCheck(positionsCopy, this.player);
    }

    canCaptureKing(positions) {
        if (this.movingPiece['color'] != this.player) {
            return false;
        }

        if (this.movingPiece['type'] === 'pawn') {
            return this.isLegalPawnMove(positions);
        } else if (this.movingPiece['type'] === 'knight') {
            return this.isLegalKnightMove(positions);
        } else if (this.movingPiece['type'] === 'bishop') {
            return this.isLegalBishopMove(positions);
        } else if (this.movingPiece['type'] === 'king') {
            return this.isLegalKingMove(positions);
        }
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


function isCheck(positions, player) {
    const playersKingPosition = Object.keys(positions).find(field => positions[field]['color'] === player && positions[field]['type'] === 'king')
    for (const occupiedField in positions) {
        const currentPiece = positions[occupiedField];
        if (currentPiece.color != player) {
            const move = new Move(getOtherPlayer(player), currentPiece, occupiedField, playersKingPosition);
            if (move.canCaptureKing(positions)) {
                return true;
            }
        }
    }
    return false;
}
