from rest_framework import viewsets
from produtos.api import serializers
from produtos import models

class ProdutosViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProdutosSerializer
    queryset = models.Produto.objects.all()

class ProdutosMeioAMeioViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProdutosMeioAMeioSerializer
    queryset = models.ProdutoMeioAMeio.objects.all()

class CategoriasViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CategoriasSerializer
    queryset = models.Categoria.objects.all()
