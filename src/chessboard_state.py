import copy


class ChessboardState:

    def __init__(self, chessboard_state):
        self.chessboard_state = chessboard_state

    def make_move(self, move):
        new_chessboard_state = copy.deepcopy(self.chessboard_state)
        new_chessboard_state[move.new]['piece'] = self.chessboard_state[move.old]['piece']
        new_chessboard_state[move.old]['piece'] = None
        return ChessboardState(new_chessboard_state)

    def get_state(self):
        return self.chessboard_state

    def get_scores(self, piece_values):
        scores = {'white': 0, 'black': 0}

        for square_id, square in self.chessboard_state.items():
            if square['piece'] is not None:
                scores[square['piece']['color']] += piece_values[square['piece']['type']]
        
        return scores
