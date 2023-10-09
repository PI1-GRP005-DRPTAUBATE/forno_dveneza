from rest_framework import serializers
from pedidos import models

class ItemPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ItemPedido
        fields = '__all__'

class PedidosSerializer(serializers.ModelSerializer):
    itens_pedido = serializers.SerializerMethodField()

    class Meta:
        model = models.Pedido
        fields = '__all__'

    def get_itens_pedido(self, obj):
        itens = models.ItemPedido.objects.filter(pedido=obj)
        return ItemPedidoSerializer(itens, many=True).data   
        