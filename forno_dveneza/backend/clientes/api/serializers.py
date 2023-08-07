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
