from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='chess'),
    path('move', views.move, name='move'),
]
