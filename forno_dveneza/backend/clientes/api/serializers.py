# o arquivo serializers.py desempenha um papel fundamental na serialização e desserialização dos dados. A serialização refere-se ao processo de converter objetos Python em formatos de dados que possam ser facilmente armazenados, transmitidos ou exibidos, como JSON, XML, etc. A desserialização é o processo inverso, onde os dados serializados são convertidos de volta em objetos Python.

from rest_framework import serializers
from clientes import models
from django.contrib.auth.models import User

class ClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cliente
        fields = '__all__'


class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()
        return user
