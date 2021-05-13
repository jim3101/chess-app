export default class Move {
    constructor(player, movingPiece, currentSquare, targetSquare) {
        this.player = player;
        this.movingPiece = movingPiece;
        this.currentSquare = currentSquare;
        this.targetSquare = targetSquare;
    }
}
