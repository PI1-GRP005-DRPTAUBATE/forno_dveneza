from django import forms
from .models import Cliente


class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['nome', 'sobrenome', 'sexo', 'data_nascimento', 'cpf', 'cep', 'endereco', 'bairro', 'cidade', 'estado', 'telefone', 'celular']
        labels = {
            'nome': 'Nome',
            'sobrenome': 'Sobrenome',
            'sexo': 'Sexo',
            'data_nascimento': 'Data de nascimento',
            'cpf': 'CPF',
            'cep': 'CEP',
            'endereco': 'Endereço',
            'bairro': 'Bairro',
            'cidade': 'Cidade',
            'estado': 'Estado',
            'telefone': 'Telefone',
            'celular': 'Celular',

        }
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'form-control'}),
            'sobrenome': forms.TextInput(attrs={'class': 'form-control'}),
            'sexo': forms.Select(attrs={'class': 'form-control'}),
            'data_nascimento': forms.DateInput(attrs={'class': 'form-control'}),
            'cpf': forms.TextInput(attrs={'class': 'form-control'}),
            'cep': forms.TextInput(attrs={'class': 'form-control'}),
            'endereco': forms.TextInput(attrs={'class': 'form-control'}),
            'bairro': forms.TextInput(attrs={'class': 'form-control'}),
            'cidade': forms.TextInput(attrs={'class': 'form-control'}),
            'estado': forms.Select(attrs={'class': 'form-control'}),
            'telefone': forms.TextInput(attrs={'class': 'form-control'}),
            'celular': forms.TextInput(attrs={'class': 'form-control'}),
        }
