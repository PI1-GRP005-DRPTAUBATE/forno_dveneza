from django.db import models
from django.contrib.auth import get_user_model

class Funcionario(models.Model):
    SEXO_CHOICES = (
        ('F', 'Feminino'),
        ('M', 'Masculino'),
        ('N', 'Não informado')
    )

    usuario = models.ForeignKey(get_user_model(), verbose_name="Funcionario", on_delete=models.PROTECT)
    nome = models.CharField(max_length=20)
    sobrenome = models.CharField(max_length=40)
    data_nascimento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    cargo = models.ForeignKey('Cargo', on_delete=models.PROTECT)
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    cep = models.CharField(max_length=9)
    endereco = models.CharField(max_length=50)
    bairro = models.CharField(max_length=20)
    cidade = models.CharField(max_length=20)
    estado = models.CharField(max_length=2, default='SP')
    telefone = models.CharField(max_length=15, blank=True)
    celular = models.CharField(max_length=15)
    data_admissao = models.DateField()
    data_demissao = models.DateField(blank=True, null=True)
    data_cadastro = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.nome} {self.sobrenome}'

class Cargo(models.Model):
    titulo = models.CharField(max_length=40)

    def __str__(self):
        return self.titulo
