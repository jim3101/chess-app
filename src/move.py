class Move:

    def __init__(self, piece_type, old_position, new_position):
        self.piece = piece_type
        self.old = old_position
        self.new = new_position

    def as_dict(self):
        return {'piece': self.piece,
                'old': self.old,
                'new': self.new}
