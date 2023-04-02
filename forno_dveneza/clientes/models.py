from django.db import models
from django.contrib.auth import get_user_model

class Cliente(models.Model):
    usuario = models.ForeignKey(get_user_model(), verbose_name="Cliente", on_delete=models.CASCADE)
    nome = models.CharField(max_length=20)
    sobrenome = models.CharField(max_length=40)
    cpf = models.CharField(max_length=11)
    cep = models.CharField(max_length=9)

    def __str__(self):
        return f"{self.nome} {self.sobrenome}"
    
