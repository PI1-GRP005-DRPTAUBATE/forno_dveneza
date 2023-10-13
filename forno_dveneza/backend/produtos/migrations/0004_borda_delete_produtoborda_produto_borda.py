# Generated by Django 4.1.7 on 2023-09-13 03:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('produtos', '0003_produtoborda'),
    ]

    operations = [
        migrations.CreateModel(
            name='Borda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descricao', models.TextField()),
                ('preco_extra', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
        migrations.DeleteModel(
            name='ProdutoBorda',
        ),
        migrations.AddField(
            model_name='produto',
            name='borda',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='produtos.borda'),
        ),
    ]