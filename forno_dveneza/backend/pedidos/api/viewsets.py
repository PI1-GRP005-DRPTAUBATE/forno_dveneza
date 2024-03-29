from rest_framework import viewsets
from pedidos.api import serializers
from pedidos import models

class PedidosViewSets(viewsets.ModelViewSet):
    serializer_class = serializers.PedidosSerializer
    queryset = models.Pedido.objects.all()
