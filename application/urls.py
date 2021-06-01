from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('chess/', include('chess_app.urls')),
    path('admin/', admin.site.urls),
]
