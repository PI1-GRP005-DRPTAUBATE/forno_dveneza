# Generated by Django 4.2 on 2023-04-09 00:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=20)),
                ('sobrenome', models.CharField(max_length=40)),
                ('sexo', models.CharField(choices=[('F', 'Feminino'), ('M', 'Masculino'), ('N', 'Não informado')], max_length=1)),
                ('data_nascimento', models.DateField()),
                ('cpf', models.CharField(max_length=11)),
                ('cep', models.CharField(max_length=9)),
                ('endereco', models.CharField(max_length=50)),
                ('bairro', models.CharField(max_length=20)),
                ('cidade', models.CharField(max_length=20)),
                ('estado', models.CharField(choices=[('SP', 'São Paulo'), ('MG', 'Minas Gerais')], max_length=2)),
                ('telefone', models.CharField(blank=True, max_length=15)),
                ('celular', models.CharField(max_length=15)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Cliente')),
            ],
        ),
    ]
