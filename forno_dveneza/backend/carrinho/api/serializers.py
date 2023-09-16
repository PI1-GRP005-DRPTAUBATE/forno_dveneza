from rest_framework import serializers
from carrinho import models

class CarrinhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Carrinho
        fields = '__all__'

class ItemCarrinhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ItemCarrinho
        fields = '__all__'
        