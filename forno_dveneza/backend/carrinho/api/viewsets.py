from rest_framework import viewsets
from carrinho.api import serializers
from carrinho import models

class CarrinhoViewset(viewsets.ModelViewSet):
    serializer_class = serializers.CarrinhoSerializer
    queryset = models.Carrinho.objects.all()

class ItemCarrinhoViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ItemCarrinhoSerializer
    queryset = models.ItemCarrinho.objects.all()
