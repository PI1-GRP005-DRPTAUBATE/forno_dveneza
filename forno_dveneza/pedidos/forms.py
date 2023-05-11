from django import forms

from .models import Pedido

class PedidoForm(forms.ModelForm):
    class Meta:
        model = Pedido
        fields = ['cep', 'endereco', 'complemento', 'referencia', 'bairro', 'cidade']
        labels = {
            'cep': 'CEP',
            'endereco': 'Endereço',
            'complemento': 'Complemento',
            'referencia': 'Referência',
            'bairro': 'Bairro',
            'cidade': 'Cidade'
        }
        widgets = {
            'cep': forms.TextInput(attrs={'class': 'form-control cep'}),
            'endereco': forms.TextInput(attrs={'class': 'form-control'}),
            'complemento': forms.TextInput(attrs={'class': 'form-control'}),
            'referencia': forms.TextInput(attrs={'class': 'form-control'}),
            'bairro': forms.TextInput(attrs={'class': 'form-control'}),
            'cidade': forms.TextInput(attrs={'class': 'form-control'}),
        }
