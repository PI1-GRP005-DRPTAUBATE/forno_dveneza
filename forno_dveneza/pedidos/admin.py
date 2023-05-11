from django.contrib import admin

from .models import Pedido

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ['cliente', 'endereco', 'data_compra']
