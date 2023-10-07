from django.contrib import admin

from .models import ItemCarrinho, Carrinho

@admin.register(ItemCarrinho)
class ItemCarrinhoAdmin(admin.ModelAdmin):
    list_display = ['produto', 'quantidade']


@admin.register(Carrinho)
class CarrinhoAdmin(admin.ModelAdmin):
    pass
