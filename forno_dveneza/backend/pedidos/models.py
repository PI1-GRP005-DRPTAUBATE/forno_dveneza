from django.core.validators import MinLengthValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from clientes.models import Cliente
from produtos.models import Produto


class Pedido(models.Model):
    METODO_DE_PAGAMENTO_CHOICES = (
        ('dinheiro','Dinheiro'),
        ('cartao','Cartão')
    )

    STATUS_CHOICES = (
        ('recebido', 'Recebido'),
        ('em_preparo', 'Em Preparo'),
        ('saiu_para_entrega', 'Saiu Para Entrega'),
        ('entregue', 'Entregue'),
        ('cancelado', 'Cancelado')
    )    

    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT)
    cep = models.CharField(max_length=9, validators=[MinLengthValidator(9)])
    endereco = models.CharField(max_length=50)
    complemento = models.CharField(max_length=40, blank=True, null=True)
    referencia = models.CharField(max_length=40, blank=True, null=True)
    bairro = models.CharField(max_length=20)
    cidade = models.CharField(max_length=20)
    metodo_de_pagamento = models.CharField(max_length=20, choices=METODO_DE_PAGAMENTO_CHOICES)
    troco = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    data_compra = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=17, choices=STATUS_CHOICES, default='recebido')

class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.PROTECT, blank=True, null=True)
    produto = models.ForeignKey(Produto, on_delete=models.PROTECT)
    quantidade = models.IntegerField(null=False, default=1)

    def __str__(self):
        return f'{self.produto}'
    
@receiver(post_save, sender=ItemPedido)
def atualizar_valor_total_pedido(sender, instance, **kwargs):
    pedido = instance.pedido
    itens_pedido = ItemPedido.objects.filter(pedido=pedido)
    valor_total = sum(item.quantidade * item.produto.preco_unidade for item in itens_pedido)
    pedido.valor_total = valor_total
    pedido.save()
