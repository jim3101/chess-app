class Move:

    def __init__(self, piece_type, old_position, new_position):
        self.piece_type = piece_type
        self.old_position = old_position
        self.new_position = new_position

    def as_dict(self):
        return {'piece': self.piece_type,
                'old': self.old_position,
                'new': self.new_position}
