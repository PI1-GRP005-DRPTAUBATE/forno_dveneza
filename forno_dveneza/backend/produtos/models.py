from django.db import models

from funcionarios.models import Funcionario

class Produto(models.Model):
    nome = models.CharField(max_length=20)
    descricao = models.CharField(max_length=400)
    foto = models.ImageField(upload_to='images/')
    preco_unidade = models.DecimalField(max_digits=10, decimal_places=2)
    id_categoria = models.ForeignKey('Categoria', on_delete=models.PROTECT)
    # id_funcionario = models.ForeignKey(Funcionario, on_delete=models.PROTECT, null=True)
    data_cadastro = models.DateTimeField(auto_now=True)
    borda = models.ForeignKey('Borda', on_delete=models.PROTECT, null=True)

    @property
    def preco_unidade_com_borda(self):
        if self.borda:
            return self.preco_unidade + self.borda.preco_extra
        return self.preco_unidade

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
    descricao = models.TextField()
    preco_extra = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.descricao