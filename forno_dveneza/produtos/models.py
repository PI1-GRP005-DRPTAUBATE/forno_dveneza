from django.db import models

class Produto(models.Model):

    nome = models.CharField(max_length=20)
    descricao = models.CharField(max_length=400)
    foto = models.ImageField(upload_to='images/')
    preco_unidade = models.DecimalField(max_digits=10, decimal_places=2)
    id_categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE)
    data_cadastro = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome
    

class Categoria(models.Model):
    descricao = models.CharField(max_length=20)

    def __str__(self):
        return self.descricao
    
