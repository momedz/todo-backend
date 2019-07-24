from django.urls import path

from . import views

urlpatterns = [
    path('', views.all),
    path('<int:id>/', views.by_id),
]
