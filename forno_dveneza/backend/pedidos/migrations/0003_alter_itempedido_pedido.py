# Generated by Django 4.1.7 on 2023-10-04 22:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0002_remove_pedido_itens_itempedido'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itempedido',
            name='pedido',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='pedidos.pedido'),
        ),
    ]
