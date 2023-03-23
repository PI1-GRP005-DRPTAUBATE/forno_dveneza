from django.shortcuts import render

from .models import Produto, Categoria

def todos_produtos(request):
    categorias = Categoria.objects.all()
    teste1 = []
    teste2 = []
    for categoria in categorias:
        teste1.append(categoria.pk)
        teste2.append(categoria.descricao)
        print(dir(categoria.descricao))
        print(categoria.descricao.__str__())

    
    return render(request, 'produtos/todos.html', {
        'categorias': categorias,
        'produtos': Produto.objects.all()
    })