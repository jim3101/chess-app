const whiteCharacters = {'king': String.fromCharCode(9812), 'queen': String.fromCharCode(9813), 'rook': String.fromCharCode(9814),
                   'bishop': String.fromCharCode(9815), 'knight': String.fromCharCode(9816), 'pawn': String.fromCharCode(9817)};


const blackCharacters = {'king': String.fromCharCode(9818), 'queen': String.fromCharCode(9819), 'rook': String.fromCharCode(9820),
                   'bishop': String.fromCharCode(9821), 'knight': String.fromCharCode(9822), 'pawn': String.fromCharCode(9823)};


const chessChars = {'white': whiteCharacters, 'black': blackCharacters};


export default class Piece {
    constructor(color, type) {
        this.color = color;
        this.type = type;
        this.char = chessChars[this.color][this.type];
        this.position = undefined;
    }

    setPosition(position) {
        this.position = position;
    }
}
