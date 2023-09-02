from django.core.validators import MinLengthValidator
from django.db import models
from django.contrib.auth import get_user_model

from cpf_field.models import CPFField

class Cliente(models.Model):
    SEXO_CHOICES = (
        ('F', 'Feminino'),
        ('M', 'Masculino'),
        ('N', 'Não informado')
    )
    ESTADO_CHOICES = (
        ('SP', 'São Paulo'),
        ('NI', 'Não informado')
    )

    usuario = models.OneToOneField(get_user_model(), verbose_name="Cliente", on_delete=models.CASCADE)
    nome = models.CharField(max_length=20)
    sobrenome = models.CharField(max_length=40)
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    data_nascimento = models.DateField()
    cpf = CPFField('cpf')
    cep = models.CharField(max_length=9, validators=[MinLengthValidator(9)])
    endereco = models.CharField(max_length=50)
    complemento = models.CharField(max_length=40, blank=True, null=True)
    referencia = models.CharField(max_length=40, blank=True, null=True)
    bairro = models.CharField(max_length=20)
    cidade = models.CharField(max_length=20)
    estado = models.CharField(max_length=2, choices=ESTADO_CHOICES)
    telefone = models.CharField(max_length=14, validators=[MinLengthValidator(14)], blank=True)
    celular = models.CharField(max_length=15, validators=[MinLengthValidator(15)])
    data_cadastro = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.nome} {self.sobrenome}"
