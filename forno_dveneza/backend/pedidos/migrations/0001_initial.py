# Generated by Django 4.1.7 on 2023-09-01 23:39

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('carrinho', '0001_initial'),
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cep', models.CharField(max_length=9, validators=[django.core.validators.MinLengthValidator(9)])),
                ('endereco', models.CharField(max_length=50)),
                ('complemento', models.CharField(blank=True, max_length=40, null=True)),
                ('referencia', models.CharField(blank=True, max_length=40, null=True)),
                ('bairro', models.CharField(max_length=20)),
                ('cidade', models.CharField(max_length=20)),
                ('metodo_de_pagamento', models.CharField(choices=[('dinheiro', 'Dinheiro'), ('cartao', 'Cartão')], max_length=20)),
                ('troco', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('valor_total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('data_compra', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(choices=[('recebido', 'Recebido'), ('em_preparo', 'Em Preparo'), ('saiu_para_entrega', 'Saiu Para Entrega'), ('entregue', 'Entregue'), ('cancelado', 'Cancelado')], default='recebido', max_length=17)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='clientes.cliente')),
                ('itens', models.ManyToManyField(blank=True, to='carrinho.itemcarrinho')),
            ],
        ),
    ]
