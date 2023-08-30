from rest_framework import serializers
from carrinho import models

class CarrinhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Carrinho
        fields = '__all__'