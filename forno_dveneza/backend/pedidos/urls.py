from django.urls import path
from . import views

urlpatterns = [
    path('novo-pedido/', views.CriarPedidoView.as_view(), name='novo_pedido'),
    path('todos-pedidos/', views.ListarPedidosView.as_view(), name='todos_pedidos'),
    path('info-pedido/<int:id>/', views.InformacoesPedidoView.as_view(), name='info-pedido')
]