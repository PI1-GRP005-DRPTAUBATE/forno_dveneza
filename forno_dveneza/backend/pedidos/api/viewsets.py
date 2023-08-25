from rest_framework import viewsets
from pedidos.api import serializers
from pedidos import models

class PedidosViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PedidosSerializers
    queryset = models.Pedido.objects.all()
