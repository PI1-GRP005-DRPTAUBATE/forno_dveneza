from django.contrib import admin

from .models import Pedido, ItemPedido

class ItemPedidoInline(admin.StackedInline):
    model = ItemPedido
    extra = 0

class PedidoAdmin(admin.ModelAdmin):
    inlines = [ItemPedidoInline]
    list_display = ['id', 'cliente', 'data_compra']

admin.site.register(Pedido, PedidoAdmin)
