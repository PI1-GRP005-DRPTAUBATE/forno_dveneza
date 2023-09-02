from rest_framework import viewsets
from carrinho.api import serializers
from carrinho import models

class CarrinhoViewsets(viewsets.ModelViewSet):
    serializer_class = serializers.CarrinhoSerializer
    queryset = models.Carrinho.objects.all()