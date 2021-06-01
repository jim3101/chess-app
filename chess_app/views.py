from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'chess_app/index.html')
