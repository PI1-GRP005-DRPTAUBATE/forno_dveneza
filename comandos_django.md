# Comandos Django
[Clique aqui](https://docs.djangoproject.com/pt-br/4.1/) para acessar a documentação oficial do Django Framework

## Instalando o Django
#### Windows:
```sh
py -m pip install Django
```
#### Linux/MacOS ou Debian (3.2.18):
```sh
python -m pip install Django
ou
apt install python3-django
```
## Verificando a versão do Django
#### Windows:
```sh
py -m django --version
```
#### Linux/MacOS:
```sh
python -m django --version
```

## Projeto
### Criar projeto Django:
#### Windows
```sh
django-admin startproject nome_projeto .
```
#### Linux/MacOS:
```sh
django-admin startproject nome_projeto .
```

### Executar servidor de desenvolvimento:
#### Windows
```sh
py .\manage.py runserver
```
#### Linux/MacOS:
```sh
python manage.py runserver
```

## App
### Criar app dentro do projeto:
#### Windows
```sh
py .\manage.py startapp nome_app
```
#### Linux/MacOS:
```sh
python manage.py startapp nome_app
```

## Migrations
### Criar migrations:
#### Windows:
```sh
py manage.py makemigrations
```

#### Linux/MacOS:
```sh
python manage.py makemigrations
```
### Aplicar mudanças ao banco de dados:
#### Windows:
```sh
py manage.py migrate
```
### Linux/MacOS:
```sh
python manage.py migrate
```

## Users
### Criar superuser para usar o Admin (depois de adicionar a model no arquivo admin.py):
### Windows:
```sh
py manage.py createsuperuser
```
### Linux/MacOS:
```sh
python manage.py createsuperuser 

```
