from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.sair, name='sair'),
    path('cadastro/', views.cadastro, name='cadastro'),
    path('minha-area/', views.minha_area, name='minha_area'),
    path('editar-perfil', views.editar_perfil, name='editar-perfil'),
    path('carrinho/', views.carrinho, name="carrinho")
]