from django.contrib import admin

from .models import Produto, Categoria, ProdutoMeioAMeio

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
  list_display = ['nome', 'descricao', 'preco_unidade', 'id_categoria']
  list_filter = ['id_categoria']
@admin.register(ProdutoMeioAMeio)
class ProdutoMeioAMeioAdmin(admin.ModelAdmin):
  list_display = ['nome', 'preco']
admin.site.register(Categoria)
