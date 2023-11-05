from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from clientes.api import viewsets as clientesviewsets
from produtos.api import viewsets as produtosviewsets

route = routers.DefaultRouter()
route.register(r'usuarios', clientesviewsets.UsuariosViewSet, basename="Usuarios")
route.register(r'cliente', clientesviewsets.ClientesViewSet, basename="Clientes")
route.register(r'categorias', produtosviewsets.CategoriasViewSet, basename="Categorias")
route.register(r'produtos', produtosviewsets.ProdutosViewSet, basename="Produtos")
route.register(r'bordas', produtosviewsets.BordasViewSet, basename="Bordas")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(route.urls)),
    path('api/usuario/', include('clientes.urls')),
    path('api/carrinho/', include('carrinho.urls')),
    path('api/pedido/', include('pedidos.urls'))
]

urlpatterns += [
    re_path(r'·*', TemplateView.as_view(template_name='index.html'))
]
