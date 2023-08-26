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
route.register(r'pedidos', pedidosviewsets.PedidosViewSet, basename="Pedidos")
route.register(r'carrinho', carrinhoviewsets.CarrinhoViewset, basename="Carrinho")
route.register(r'item-carrinho', carrinhoviewsets.ItemCarrinhoViewset, basename="ItemCarrinho")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(route.urls)),
    path('api-cliente/', include('clientes.urls'))
]

urlpatterns += [
    re_path(r'·*', TemplateView.as_view(template_name='index.html'))
]
