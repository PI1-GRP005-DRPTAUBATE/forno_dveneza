from django.urls import path
from . import views

urlpatterns = [
    path('', views.criar_pedido, name='criar_pedido'),
]