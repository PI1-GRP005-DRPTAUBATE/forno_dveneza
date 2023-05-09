from django.contrib import admin

from .models import Funcionario, Cargo


@admin.register(Funcionario)
class FuncionarioAdmin(admin.ModelAdmin):
    list_display = ['nome', 'sobrenome', 'cargo', 'celular']
    list_filter = ['cargo']

admin.site.register(Cargo)
