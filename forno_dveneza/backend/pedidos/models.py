from django.core.validators import MinLengthValidator
from django.db import models

from carrinho.models import ItemCarrinho
from clientes.models import Cliente


class Pedido(models.Model):
    STATUS_CHOICES = (
        ('recebido', 'Recebido'),
        ('em_preparo', 'Em Preparo'),
        ('saiu_para_entrega', 'Saiu Para Entrega'),
        ('entregue', 'Entregue'),
        ('cancelado', 'Cancelado')
    )    

    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT)
    itens = models.ManyToManyField(ItemCarrinho, blank=True)
    cep = models.CharField(max_length=9, validators=[MinLengthValidator(9)])
    endereco = models.CharField(max_length=50)
    complemento = models.CharField(max_length=40, blank=True, null=True)
    referencia = models.CharField(max_length=40, blank=True, null=True)
    bairro = models.CharField(max_length=20)
    cidade = models.CharField(max_length=20)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    data_compra = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=17, choices=STATUS_CHOICES, default='recebido')
