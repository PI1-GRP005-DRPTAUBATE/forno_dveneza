from django.urls import path
from . import views

urlpatterns = [
    path('', views.todos_produtos, name='todos_produtos'),
    path('<int:produto_id>', views.adicionar_produto_carrinho, name='adicionar_produto')
]
