from django.urls import path
from . import views

urlpatterns = [
    path('', views.carrinho, name='carrinho'),
    path('<int:item_id>', views.excluir_item, name='excluir_item')
]
