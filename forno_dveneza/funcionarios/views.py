from django.shortcuts import render, redirect
from .forms import FuncionarioForm

def cadastrar_funcionario(request):
    if request.method == 'POST':
        form = FuncionarioForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('lista_funcionarios')
    else:
        form = FuncionarioForm()
    return render(request, 'cadastrar_funcionario.html', {'form': form})
