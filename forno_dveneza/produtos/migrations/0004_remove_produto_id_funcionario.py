# Generated by Django 4.1.7 on 2023-07-16 11:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('produtos', '0003_produto_id_funcionario_alter_produto_id_categoria'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='produto',
            name='id_funcionario',
        ),
    ]
