# O arquivo viewsets.py é usado em um projeto Django Rest Framework para definir conjuntos de visualizações (viewsets) que especificam as operações que podem ser realizadas em seus modelos através da API. Os viewsets agrupam conjuntos relacionados de operações de CRUD (Create, Read, Update, Delete) em uma única classe, tornando mais conveniente e eficiente o gerenciamento das operações da API.

# Os viewsets são uma abstração poderosa do Django Rest Framework, pois fornecem uma maneira organizada de definir como as solicitações HTTP (como GET, POST, PUT, DELETE) devem ser tratadas para seus modelos. 

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
