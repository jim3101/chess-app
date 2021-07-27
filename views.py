from django.shortcuts import render
from django.http import JsonResponse
import json
import time


def index(request):
    return render(request, 'chess_app/index.html')


def move(request):
    time.sleep(1)
    return JsonResponse({'piece': 'pawn', 'oldSquare': 'd7', 'newSquare': 'd5'})
