from django.shortcuts import render

from carrinho.models import Carrinho
from clientes.models import Cliente
from pedidos.forms import PedidoForm
from pedidos.models import Pedido

def criar_pedido(request):
    cliente = Cliente.objects.filter(usuario=request.user).first()
    carrinho_cliente = Carrinho.objects.filter(cliente=cliente).first()

    form = PedidoForm(instance=cliente)

    if request.method == 'GET':
        return render(request, 'pedido/pedido.html', context={
            'form': form
        })
    else:
        form = PedidoForm(request.POST)
        if form.is_valid():
            novo_cep = form.cleaned_data['cep']
            novo_endereco = form.cleaned_data['endereco']
            novo_complemento = form.cleaned_data['complemento']
            novo_referencia = form.cleaned_data['referencia']
            novo_bairro = form.cleaned_data['bairro']
            novo_cidade = form.cleaned_data['cidade']

        total = 0
        for item in carrinho_cliente.itens.all():
            total += item.produto.preco_unidade


        pedido = Pedido(
            cliente=carrinho_cliente.cliente,
            cep=novo_cep,
            endereco=novo_endereco,
            complemento=novo_complemento,
            referencia=novo_referencia,
            bairro=novo_bairro,
            cidade=novo_cidade,
            valor_total=total,
            status='recebido'
        )

        pedido.save()
        pedido.itens.set(list(carrinho_cliente.itens.all()))
        pedido.save()

        carrinho_cliente.itens.clear()

        return render(request, 'pedido/sucesso.html')
