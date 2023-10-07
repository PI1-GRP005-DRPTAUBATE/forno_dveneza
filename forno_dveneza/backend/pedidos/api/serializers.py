from rest_framework import serializers
from pedidos import models

class PedidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Pedido
        fields = '__all__'

class ItemPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ItemPedido
        fields = '__all__'
        