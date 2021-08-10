import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from chess_app.src.legal_moves import LegalMoves
from chess_engine.src.chess_engine import ChessEngine
from chess_app.src.chessboard_state import ChessboardState


@ensure_csrf_cookie
def index(request):
    return render(request, 'chess_app/index.html')


def move(request):
    if request.method == 'POST':
        move_data = json.loads(request.body)
        chess_engine = ChessEngine(move_data['player'], ChessboardState(move_data['chessboardState']))
        best_move, move_evaluation = chess_engine.get_best_move(depth=2)
        return JsonResponse({'move': best_move.as_dict(), 'checkmate': False})
    else:
        return JsonResponse({'error': 'only post requests are allowed'})


def legal_moves(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        legal_moves = LegalMoves(data['player'], data['chessboardState'], piece=data['piece'], remove_checks=True).get_legal_moves()
        return JsonResponse({'legalMoves': [move.as_dict() for move in legal_moves]})
    else:
        return JsonResponse({'error': 'only post requests are allowed'})
