from django.shortcuts import render

def login(request):
    return render(request, 'clientes/login.html')

def cadastro(request):
    return render(request, 'clientes/cadastro.html')