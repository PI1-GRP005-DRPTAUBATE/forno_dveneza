from rest_framework import viewsets
from clientes.api import serializers
from clientes import models
from django.contrib.auth.models import User

class ClientesViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ClientesSerializer
    queryset = models.Cliente.objects.all()

class UsuariosViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UsuariosSerializer
    queryset = User.objects.all()
