from django.db import models
from django.contrib.auth import get_user_model

class Funcionario(models.Model):
    SEXO_CHOICES = (
        ('F', 'Feminino'),
        ('M', 'Masculino'),
        ('N', 'Não informado')
    )

    usuario = models.ForeignKey(get_user_model(), verbose_name="Funcionario", on_delete=models.CASCADE)
    nome = models.CharField(max_length=20)
    sobrenome = models.CharField(max_length=40)
    data_nascimento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    cargo = models.CharField(max_length=40)
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    cep = models.CharField(max_length=9)
    endereco = models.CharField(max_length=50)
    bairro = models.CharField(max_length=20)
    cidade = models.CharField(max_length=20)
    telefone = models.CharField(max_length=15, blank=True)
    celular = models.CharField(max_length=15)
    data_admissao = models.DateField()
    data_demissao = models.DateField(blank=True, null=True)
