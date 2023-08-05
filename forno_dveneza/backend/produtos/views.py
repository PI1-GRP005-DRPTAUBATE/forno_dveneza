from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse

from carrinho.models import Carrinho, ItemCarrinho
from clientes.models import Cliente
from .models import Produto, Categoria

def todos_produtos(request):    
    return render(request, 'produtos/todos.html', {
        'categorias': Categoria.objects.all(),
        'produtos': Produto.objects.all(),
    })

@login_required(login_url='login')
def adicionar_produto_carrinho(request, produto_id):
    cliente = Cliente.objects.filter(usuario=request.user).first()
    carrinho_cliente = Carrinho.objects.filter(cliente=cliente).first()
    produto = Produto.objects.filter(id=produto_id).first()

    item = ItemCarrinho(produto=produto, quantidade=1)
    item.save()
    carrinho_cliente.itens.add(item.id)

    carrinho_cliente.save()

    return render(request, 'produtos/todos.html', {
        'categorias': Categoria.objects.all(),
        'produtos': Produto.objects.all(),
        'cadastrado': True
    })
