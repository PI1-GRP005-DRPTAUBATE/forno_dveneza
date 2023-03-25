from django.http.response import HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

def login(request):
    if request.method == 'GET':
        return render(request, 'clientes/login.html')
    else:
        nome_usuario = request.POST.get('nome')
        senha = request.POST.get('senha')

        user = authenticate(username=nome_usuario, password=senha)

        if user:
            login_django(request, user)
            return HttpResponse('autenticado')
        else:
            return HttpResponse('username ou senha inválidos')


def cadastro(request):
    if request.method == 'GET':
        return render(request, 'clientes/cadastro.html')
    else:
        nome_usuario = request.POST.get('nome')
        email = request.POST.get('email')

        user = User.objects.filter(email=email) or User.objects.filter(username=nome_usuario)

        if user:
            return HttpResponse('email ou usuario já cadastrados')
        
        senha = request.POST.get('senha')
        user = User.objects.create_user(username=nome_usuario, email=email, password=senha)
        return HttpResponse('usuario cadastrado com sucesso')


@login_required(login_url='login/')
def plataforma(request):
    return HttpResponse('logado')