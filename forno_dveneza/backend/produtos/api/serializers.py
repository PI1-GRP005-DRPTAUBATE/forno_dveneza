from rest_framework import serializers
from produtos import models

class ProdutosSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Produto
        fields = '__all__'

class ProdutosMeioAMeioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProdutoMeioAMeio
        fields = '__all__'

class CategoriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Categoria
        fields = '__all__'
