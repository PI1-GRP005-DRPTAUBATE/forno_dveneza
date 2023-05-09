from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from produtos.models import Produto
from .models import Carrinho
from clientes.models import Cliente

# Create your views here.

@login_required(login_url='login')
def carrinho(request):
    produtos = Produto.objects.all()
    cliente = Cliente.objects.filter(usuario=request.user).first()
    carrinho_cliente = Carrinho.objects.filter(cliente=cliente).first()

    print(carrinho_cliente.itens.all())

    total = 0
    for item in carrinho_cliente.itens.all():
        total += item.produto.preco_unidade

    return render(request, 'carrinho/carrinho.html', context={
        'cliente': cliente,
        'carrinho': carrinho_cliente,
        'produtos': produtos,
        'preco_total': total
    })
