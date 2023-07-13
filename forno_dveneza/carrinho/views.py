from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from produtos.models import Produto
from .models import Carrinho
from .models import ItemCarrinho
from clientes.models import Cliente

# Create your views here.

@login_required(login_url='login')
def carrinho(request):
    produtos = Produto.objects.all()
    cliente = Cliente.objects.filter(usuario=request.user).first()
    carrinho_cliente = Carrinho.objects.filter(cliente=cliente).first()

    total = 0
    for item in carrinho_cliente.itens.all():
        total += item.produto.preco_unidade

    return render(request, 'carrinho/carrinho.html', context={
        'cliente': cliente,
        'carrinho': carrinho_cliente,
        'produtos': produtos,
        'preco_total': total
    })

def excluir_item(request, item_id):
    cliente = Cliente.objects.filter(usuario=request.user).first()
    carrinho_cliente = Carrinho.objects.filter(cliente=cliente).first()
    produtos = Produto.objects.all()

    carrinho_cliente.itens.remove(item_id)
    ItemCarrinho.objects.filter(id=item_id).delete()

    total = 0
    for item in carrinho_cliente.itens.all():
        total += item.produto.preco_unidade

    return render(request, 'carrinho/carrinho.html', context={
        'cliente': cliente,
        'carrinho': carrinho_cliente,
        'produtos': produtos,
        'preco_total': total
    })
