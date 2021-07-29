from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='chess'),
    path('move', views.move, name='move'),
    path('legalmoves/', views.legal_moves, name='legal-moves'),
]
