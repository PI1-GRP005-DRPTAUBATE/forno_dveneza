from django import forms

from .models import Cliente


class ClienteForm(forms.ModelForm):
    model = Cliente
    fields = ['nome', 'sobrenome', 'cpf', 'cep']
    labels = {
        'nome': 'Nome',
        'sobrenome': 'Sobrenome',
        'cpf': 'CPF',
        'cep': 'CEP'
    }
    widgets = {
        'nome': forms.TextInput(attrs={'class': 'form-control'}),
        'sobrenome': forms.TextInput(attrs={'class': 'form-control'}),
        'cpf': forms.TextInput(attrs={'class': 'form-control'}),
        'cep': forms.TextInput(attrs={'class': 'form-control'})
    }
