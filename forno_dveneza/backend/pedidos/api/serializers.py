from rest_framework import serializers
from pedidos import models

class PedidosSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Pedido
        fields = '__all__'
