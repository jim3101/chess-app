import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from chess_app.src.legal_moves import LegalMoves


@ensure_csrf_cookie
def index(request):
    return render(request, 'chess_app/index.html')


def move(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'not implemented yet'})
    else:
        return JsonResponse({'error': 'only post requests are allowed'})


def legal_moves(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        legal_moves = LegalMoves(data['player'], data['piece'], data['chessboardState']).get_legal_moves()
        # legal_moves = get_legal_moves(data['player'], data['piece'], data['chessboardState'])
        return JsonResponse({'legalMoves': legal_moves})
    else:
        return JsonResponse({'error': 'only post requests are allowed'})
