import copy
from chess_app.src.move import Move


class LegalMoves:

    def __init__(self, player, chessboard_state, piece=None, remove_checks=True):
        self.player = player
        self.chessboard_state = chessboard_state
        self.piece = piece
        self.should_remove_checks = remove_checks

        if self.piece is not None:
            self.rank_number = self.get_rank_number(self.piece['position'])
            self.file_number = self.get_file_number(self.piece['position'])
        else:
            self.rank_number = None
            self.file_number = None

        self.legal_moves = []

    def set_piece(self, piece):
        self.piece = piece

        self.rank_number = self.get_rank_number(piece['position'])
        self.file_number = self.get_file_number(piece['position'])

    def get_all_legal_moves(self):
        all_legal_moves = []
        for square_id, square_data in self.chessboard_state.items():
            if square_data['piece'] is not None and square_data['piece']['color'] == self.player:
                self.set_piece(square_data['piece'])
                all_legal_moves.extend(self.get_legal_moves())

        return all_legal_moves

    def get_legal_moves(self):
        self.legal_moves = []
        if self.player != self.piece['color']:
            return []
        
        if self.piece['type'] == 'pawn':
            self.add_legal_pawn_moves()
        if self.piece['type'] == 'knight':
            self.add_legal_knight_moves()
        if self.piece['type'] == 'bishop':
            self.add_legal_bishop_moves()
        if self.piece['type'] == 'rook':
            self.add_legal_rook_moves()
        if self.piece['type'] == 'queen':
            self.add_legal_queen_moves()
        if self.piece['type'] == 'king':
            self.add_legal_king_moves()

        if self.should_remove_checks:
            self.remove_checks()

        return self.legal_moves

    def add_legal_pawn_moves(self):
        one_forward = self.get_square_code(self.file_number, self.rank_number+1)
        if one_forward:
            self.assess_move(one_forward, [self.square_is_free(one_forward)])

        two_forward = self.get_square_code(self.file_number, self.rank_number+2)
        if two_forward:
            self.assess_move(two_forward, [self.square_is_free(two_forward), self.square_is_free(one_forward), self.rank_number==2])

        take_left = self.get_square_code(self.file_number-1, self.rank_number+1)
        if take_left:
            self.assess_move(take_left, [self.opponent_occupies_square(take_left)])

        take_right = self.get_square_code(self.file_number+1, self.rank_number+1)
        if take_right:
            self.assess_move(take_right, [self.opponent_occupies_square(take_right)])

    def add_legal_knight_moves(self):
        possible_moves = [(self.file_number+1, self.rank_number-2), (self.file_number+2, self.rank_number-1),
                          (self.file_number+1, self.rank_number+2), (self.file_number+2, self.rank_number+1),
                          (self.file_number-1, self.rank_number-2), (self.file_number-2, self.rank_number-1),
                          (self.file_number-1, self.rank_number+2), (self.file_number-2, self.rank_number+1),]

        for possible_move in possible_moves:
            new_position = self.get_square_code(possible_move[0], possible_move[1])
            if new_position:
                self.assess_move(new_position, [not self.i_occupy_square(new_position)])

    def add_legal_bishop_moves(self):
        possible_directions = [[(self.file_number-i, self.rank_number+i) for i in range(1, min(self.file_number, (9-self.rank_number)))],
                               [(self.file_number+i, self.rank_number+i) for i in range(1, min((9-self.file_number), (9-self.rank_number)))],
                               [(self.file_number-i, self.rank_number-i) for i in range(1, min(self.file_number, self.rank_number))],
                               [(self.file_number+i, self.rank_number-i) for i in range(1, min((9-self.file_number), self.rank_number))]]

        for possible_moves in possible_directions:
            for possible_move in possible_moves:
                new_position = self.get_square_code(possible_move[0], possible_move[1])
                if new_position:
                    path_blocked = self.assess_move(new_position, [not self.i_occupy_square(new_position)])
                    if path_blocked:
                        break

    def add_legal_rook_moves(self):
        possible_directions = [[(self.file_number, self.rank_number+i) for i in range(1, (9-self.rank_number))],
                               [(self.file_number+i, self.rank_number) for i in range(1, (9-self.file_number))],
                               [(self.file_number, self.rank_number-i) for i in range(1, self.rank_number)],
                               [(self.file_number-i, self.rank_number) for i in range(1, self.file_number)]]

        for possible_moves in possible_directions:
            for possible_move in possible_moves:
                new_position = self.get_square_code(possible_move[0], possible_move[1])
                if new_position:
                    path_blocked = self.assess_move(new_position, [not self.i_occupy_square(new_position)])
                    if path_blocked:
                        break

    def add_legal_queen_moves(self):
        self.add_legal_bishop_moves()
        self.add_legal_rook_moves()

    def add_legal_king_moves(self):
        possible_moves = [(self.file_number, self.rank_number+1), (self.file_number+1, self.rank_number+1),
                          (self.file_number+1, self.rank_number), (self.file_number+1, self.rank_number-1),
                          (self.file_number, self.rank_number-1), (self.file_number-1, self.rank_number-1),
                          (self.file_number-1, self.rank_number), (self.file_number-1, self.rank_number+1)]

        for possible_move in possible_moves:
            new_position = self.get_square_code(possible_move[0], possible_move[1])
            if new_position:
                self.assess_move(new_position, [not self.i_occupy_square(new_position)])

    def assess_move(self, new_position, conditions):
        if all(conditions):
            new_move = Move(self.piece['type'], self.piece['position'], new_position)
            self.legal_moves.append(new_move)
            if not self.square_is_free(new_position):
                return True
            return False
        return True

    def remove_checks(self):
        moves_without_checks = []

        for legal_move in self.legal_moves:
            next_chessboard_state = copy.deepcopy(self.chessboard_state)
            next_chessboard_state[legal_move.new]['piece'] = copy.copy(self.chessboard_state[legal_move.old]['piece'])
            next_chessboard_state[legal_move.old]['piece'] = None

            if not self.can_next_player_take_king(next_chessboard_state):
                moves_without_checks.append(legal_move)
        
        self.legal_moves = moves_without_checks            

    def can_next_player_take_king(self, next_chessboard_state):
        next_players_legal_moves = LegalMoves(self.get_other_player(), next_chessboard_state, remove_checks=False).get_all_legal_moves()
        for move in next_players_legal_moves:
            new_square = next_chessboard_state[move.new]
            if new_square['piece'] and new_square['piece']['color'] == self.player and new_square['piece']['type'] == 'king':
                return True
        return False

    def square_is_free(self, square_code):
        return self.chessboard_state[square_code]['piece'] == None

    def opponent_occupies_square(self, square_code):
        if self.square_is_free(square_code):
            return False
        else:
            return self.chessboard_state[square_code]['piece']['color'] != self.player

    def i_occupy_square(self, square_code):
        if self.square_is_free(square_code):
            return False
        else:
            return self.chessboard_state[square_code]['piece']['color'] == self.player

    def get_file_number(self, square_code):
        if self.player == 'white':
            return ord(square_code[0]) - ord('a') + 1
        elif self.player == 'black':
            return 9 - (ord(square_code[0]) - ord('a') + 1)

    def get_rank_number(self, square_code):
        if self.player == 'white':
            return int(square_code[1])
        elif self.player == 'black':
            return 9 - int(square_code[1])

    def get_square_code(self, file_number, rank_number):
        if file_number <= 0 or file_number > 8 or rank_number <= 0 or rank_number > 8:
            return None
        if self.player == 'white':
            file_code = chr(file_number - 1 + ord('a'))
            rank_code = str(rank_number)
            return file_code + rank_code
        elif self.player == 'black':
            file_code = chr((9 - file_number) - 1 + ord('a'))
            rank_code = str(9 - rank_number)
            return file_code + rank_code

    def get_other_player(self):
        if self.player == 'white':
            return 'black'
        else:
            return 'white'
