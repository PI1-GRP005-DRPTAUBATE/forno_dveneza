from django.db import models

class Produto(models.Model):
    nome = models.CharField(max_length=20)
    descricao = models.CharField(max_length=400)
    foto = models.ImageField(upload_to='images/')
    preco_unidade = models.DecimalField(max_digits=10, decimal_places=2)
    id_categoria = models.ForeignKey('Categoria', on_delete=models.PROTECT)
    data_cadastro = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome
    
class ProdutoMeioAMeio(models.Model):
    produto1 = models.ForeignKey('Produto', related_name="Produto1", on_delete=models.CASCADE)
    produto2 = models.ForeignKey('Produto', related_name="Produto2", on_delete=models.CASCADE)

    @property
    def nome(self):
        return f"{self.produto1.nome}/{self.produto2.nome}"
    
    @property
    def preco(self):
        return (self.produto1.preco_unidade + self.produto2.preco_unidade) / 2
    
    def __str__(self):
        return self.nome
    

class Categoria(models.Model):
    descricao = models.CharField(max_length=20)

    def __str__(self):
        return self.descricao

class Borda(models.Model):
    descricao = models.CharField(max_length=50)
    preco_extra = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.descricao