from django.contrib import admin

from .models import Produto, Categoria

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
  list_display = ['nome', 'descricao', 'preco_unidade', 'id_categoria']
admin.site.register(Categoria)
