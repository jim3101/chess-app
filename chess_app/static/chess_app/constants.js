import Piece from './piece.js';


const whiteCharacters = {'king': String.fromCharCode(9812), 'queen': String.fromCharCode(9813), 'rook': String.fromCharCode(9814),
                   'bishop': String.fromCharCode(9815), 'knight': String.fromCharCode(9816), 'pawn': String.fromCharCode(9817)};


const blackCharacters = {'king': String.fromCharCode(9818), 'queen': String.fromCharCode(9819), 'rook': String.fromCharCode(9820),
                   'bishop': String.fromCharCode(9821), 'knight': String.fromCharCode(9822), 'pawn': String.fromCharCode(9823)};


export const chessChars = {'white': whiteCharacters, 'black': blackCharacters};


export const initialPositions = {'a1': new Piece('white', 'rook'), 
                                 'b1': new Piece('white', 'knight'), 
                                 'c1': new Piece('white', 'bishop'),
                                 'd1': new Piece('white', 'queen'), 
                                 'e1': new Piece('white', 'king'), 
                                 'f1': new Piece('white', 'bishop'),
                                 'g1': new Piece('white', 'knight'), 
                                 'h1': new Piece('white', 'rook'), 
                                 'a2': new Piece('white', 'pawn'),
                                 'b2': new Piece('white', 'pawn'), 
                                 'c2': new Piece('white', 'pawn'), 
                                 'd2': new Piece('white', 'pawn'),
                                 'e2': new Piece('white', 'pawn'), 
                                 'f2': new Piece('white', 'pawn'), 
                                 'g2': new Piece('white', 'pawn'),
                                 'h2': new Piece('white', 'pawn'),
                                 'a8': new Piece('black', 'rook'), 
                                 'b8': new Piece('black', 'knight'), 
                                 'c8': new Piece('black', 'bishop'),
                                 'd8': new Piece('black', 'queen'), 
                                 'e8': new Piece('black', 'king'), 
                                 'f8': new Piece('black', 'bishop'),
                                 'g8': new Piece('black', 'knight'), 
                                 'h8': new Piece('black', 'rook'), 
                                 'a7': new Piece('black', 'pawn'),
                                 'b7': new Piece('black', 'pawn'), 
                                 'c7': new Piece('black', 'pawn'), 
                                 'd7': new Piece('black', 'pawn'),
                                 'e7': new Piece('black', 'pawn'), 
                                 'f7': new Piece('black', 'pawn'), 
                                 'g7': new Piece('black', 'pawn'),
                                 'h7': new Piece('black', 'pawn')};
