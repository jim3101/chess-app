class Move:

    def __init__(self, piece_type, old_position, new_position):
        self.piece_type = piece_type
        self.old_position = old_position
        self.new_position = new_position

    def as_dict(self):
        return {'piece': self.piece_type,
                'old': self.old_position,
                'new': self.new_position}


def get_legal_moves(player, piece, chessboard_state):
    if piece['type'] == 'pawn':
        return get_legal_pawn_moves(player, chessboard_state)


def get_legal_pawn_moves(player, chessboard_state):
    legal_pawn_moves = []
    legal_pawn_moves.append(Move('pawn', 'e2', 'e3').as_dict())
    legal_pawn_moves.append(Move('pawn', 'e2', 'e4').as_dict())
    return legal_pawn_moves
