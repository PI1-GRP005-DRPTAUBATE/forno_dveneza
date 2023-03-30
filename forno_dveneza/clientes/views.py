from django.http.response import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from .models import Cliente


def login(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/clientes/minha-area', {
            'user': request.user,
            'cliente': Cliente.objects.filter(usuario=request.user).first(),
            'sucesso': False
        })

    if request.method == 'GET':
        return render(request, 'clientes/login.html')
    else:
        nome_usuario = request.POST.get('nome')
        senha = request.POST.get('senha')

        user = authenticate(username=nome_usuario, password=senha)

        if user:
            login_django(request, user)
            return HttpResponseRedirect('/')
        else:
            return render(request, 'clientes/login.html', {
                'aviso': 'Usuário e/ou senha incorreto(s)!'
            })


def cadastro(request):
    if request.method == 'GET':
        return render(request, 'clientes/cadastro.html')
    else:
        nome_usuario = request.POST.get('nome')
        email = request.POST.get('email')

        user = User.objects.filter(email=email) or User.objects.filter(username=nome_usuario)

        if user:
            return render(request, 'clientes/cadastro.html', {
                'aviso': 'Nome de usuário ou email já cadastrado(s)!'
            })
        
        senha = request.POST.get('senha')
        user = User.objects.create_user(username=nome_usuario, email=email, password=senha)
        login_django(request, user)
        return HttpResponseRedirect('/clientes/minha-area', {
            'user': request.user,
            'cliente': Cliente.objects.filter(usuario=user).first(),
            'sucesso': False
        })


@login_required(login_url='login')
def minha_area(request):
    if request.method == 'GET':
        return render(request, 'clientes/area-cliente.html', {
            'user': request.user,
            'cliente': Cliente.objects.filter(usuario=request.user).first(),
            'dados_salvos': False
        })
    else:
        cliente = Cliente.objects.filter(usuario=request.user).first()
        campo_nome = request.POST.get('campo-nome')
        campo_sobrenome = request.POST.get('campo-sobrenome')
        if cliente:
            cliente.nome = campo_nome
            cliente.sobrenome = campo_sobrenome
        else:
            cliente = Cliente()
            cliente.nome = campo_nome
            cliente.sobrenome = campo_sobrenome
            cliente.usuario = request.user

        cliente.save()

        return render(request, 'clientes/area-cliente.html', {
            'user': request.user,
            'cliente': Cliente.objects.filter(usuario=request.user).first(),
            'dados_salvos': True
        })


def carrinho(request):
    return render(request, 'clientes/carrinho.html')


@login_required()
def sair(request):
    logout(request)
    return HttpResponseRedirect('/')
