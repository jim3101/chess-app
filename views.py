from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from chess_app.src.legal_moves import get_legal_moves


@ensure_csrf_cookie
def index(request):
    return render(request, 'chess_app/index.html')


def move(request):
    if request.method == 'POST':
        print(request.body)
        legal_moves = get_legal_moves('white', {'type': 'pawn'}, [])
        return JsonResponse({'legalMoves': legal_moves})
    else:
        legal_moves = get_legal_moves('white', {'type': 'pawn'}, [])
        return JsonResponse({'legalMoves': legal_moves})


def legal_moves(request):
    if request.method == 'POST':
        legal_moves = get_legal_moves('white', {'type': 'pawn'}, [])
        return JsonResponse({'legalMoves': legal_moves})
    else:
        legal_moves = get_legal_moves('white', {'type': 'pawn'}, [])
        return JsonResponse({'legalMoves': legal_moves})
