from django.shortcuts import render

from .models import Produto, Categoria

def todos_produtos(request):    
    return render(request, 'produtos/todos.html', {
        'categorias': Categoria.objects.all(),
        'produtos': Produto.objects.all()
    })