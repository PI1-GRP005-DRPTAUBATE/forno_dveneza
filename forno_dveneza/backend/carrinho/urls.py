from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListaProdutosCarrinho.as_view(), name='todos_itens'),
    path('adicionar-item/', views.AdicionarProdutoCarrinho.as_view(), name='adicionar_item'),
    path('alterar-quantidade/', views.AlterarQuantidadeProduto.as_view(), name='alterar_quantidade'),
    path('excluir-item/', views.ExcluirProdutoCarrinho.as_view(), name='excluir_item')
]
