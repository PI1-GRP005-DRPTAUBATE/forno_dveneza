from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

from .models import Cliente
from .forms import ClienteForm

from carrinho.models import Carrinho


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
    return render(request, 'clientes/area-cliente.html', {
        'user': request.user,
        'cliente': Cliente.objects.filter(usuario=request.user).first(),
        'dados_salvos': False
    })

@login_required(login_url='login')
def editar_perfil(request):
    if request.method == 'GET':
        cliente = Cliente.objects.filter(usuario=request.user).first()
        if cliente:
            form = ClienteForm(instance=cliente)
        else:
            form = ClienteForm()
        context = {
            'form': form
        }
        return render(request, 'clientes/editar-perfil.html', context=context)
    else:
        cliente = Cliente.objects.filter(usuario=request.user).first()
        form = ClienteForm(request.POST)
        if form.is_valid():
            novo_nome = form.cleaned_data['nome']
            novo_sobrenome = form.cleaned_data['sobrenome']
            novo_sexo = form.cleaned_data['sexo']
            novo_data_nascimento = form.cleaned_data['data_nascimento']
            novo_cep = form.cleaned_data['cep']
            novo_cpf = form.cleaned_data['cpf']
            novo_endereco = form.cleaned_data['endereco']
            novo_bairro = form.cleaned_data['bairro']
            novo_cidade = form.cleaned_data['cidade']
            novo_estado = form.cleaned_data['estado']
            novo_telefone = form.cleaned_data['telefone']
            novo_celular = form.cleaned_data['celular']

            if cliente:
                cliente.nome = novo_nome
                cliente.sobrenome = novo_sobrenome
                cliente.sexo = novo_sexo
                cliente.data_nascimento = novo_data_nascimento
                cliente.cep = novo_cep
                cliente.cpf = novo_cpf
                cliente.endereco = novo_endereco
                cliente.bairro = novo_bairro
                cliente.cidade = novo_cidade
                cliente.estado = novo_estado
                cliente.telefone = novo_telefone
                cliente.celular = novo_celular

                cliente.save()
            else:
                cliente = Cliente(
                    usuario=request.user,
                    nome=novo_nome,
                    sobrenome=novo_sobrenome,
                    sexo=novo_sexo,
                    data_nascimento=novo_data_nascimento,
                    cep=novo_cep,
                    cpf=novo_cpf,
                    endereco=novo_endereco,
                    bairro=novo_bairro,
                    cidade=novo_cidade,
                    estado=novo_estado,
                    telefone=novo_telefone,
                    celular=novo_celular
                )
                cliente.save()

                carrinho = Carrinho(cliente=cliente)
                carrinho.save()

            return render(request, 'clientes/area-cliente.html', {
                'user': request.user,
                'cliente': Cliente.objects.filter(usuario=request.user).first(),
                'dados_salvos': True
            })
        context = {
            'form': form
        }
        return render(request, 'clientes/editar-perfil.html', context=context)


@login_required()
def sair(request):
    logout(request)
    return HttpResponseRedirect('/')
