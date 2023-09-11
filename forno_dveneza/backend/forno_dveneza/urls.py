"""forno_dveneza URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from produtos.api import viewsets as produtosviewsets
from clientes.api import viewsets as clientesviewsets
from pedidos.api import viewsets as pedidosviewsets
from carrinho.api import viewsets as carrinhoviewsets

route = routers.DefaultRouter()
# Aqui são definidas as rotas para o acesso às viewsets criadas
route.register(r'categorias', produtosviewsets.CategoriasViewSet, basename="Categorias")
route.register(r'produtos', produtosviewsets.ProdutosViewSet, basename="Produtos")
route.register(r'clientes', clientesviewsets.ClientesViewSet, basename="Clientes")
route.register(r'usuarios', clientesviewsets.UsuariosViewSet, basename="Usuarios")
route.register(r'pedidos', pedidosviewsets.PedidosViewSets, basename="Pedidos")
route.register(r'carrinho', carrinhoviewsets.CarrinhoViewsets, basename="Carrinho")
route.register(r'produtos-meio-a-meio', produtosviewsets.ProdutosMeioAMeioViewSet, basename="ProdutosMeioAMeio")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(route.urls)),
    path('api/usuario/', include('clientes.urls'))
]

urlpatterns += [
    re_path(r'·*', TemplateView.as_view(template_name='index.html'))
]
