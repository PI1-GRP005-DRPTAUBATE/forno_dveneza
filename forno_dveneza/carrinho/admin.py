from django.contrib import admin

from .models import ItemCarrinho, Carrinho


# Register your models here.

@admin.register(ItemCarrinho)
class ItemCarrinhoAdmin(admin.ModelAdmin):
    list_display = ['produto', 'quantidade']


@admin.register(Carrinho)
class CarrinhoAdmin(admin.ModelAdmin):
    pass
