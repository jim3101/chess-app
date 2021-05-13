const whiteCharacters = {'king': String.fromCharCode(9812), 'queen': String.fromCharCode(9813), 'rook': String.fromCharCode(9814),
                   'bishop': String.fromCharCode(9815), 'knight': String.fromCharCode(9816), 'pawn': String.fromCharCode(9817)};


const blackCharacters = {'king': String.fromCharCode(9818), 'queen': String.fromCharCode(9819), 'rook': String.fromCharCode(9820),
                   'bishop': String.fromCharCode(9821), 'knight': String.fromCharCode(9822), 'pawn': String.fromCharCode(9823)};


export const chessChars = {'white': whiteCharacters, 'black': blackCharacters};



export const initialPositions = {'a1': {'color': 'white', 'type': 'rook'}, 
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
