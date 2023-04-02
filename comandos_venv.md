# Criando um ambiente virtual venv

## Criação do ambiente virtual: 
> O ambiente virtual será criado no diretório o terminal está aberto. <br>
> O último argumento "venv" se refere ao nome do ambiente virtual, podendo ser alterado conforme o critério do desenvolvedor.
### Windows:
```sh
py -m venv venv
```
### Linux/MacOS:
```sh
python3 -m venv venv
```
### Debian:
```sh
apt install python3.11-venv
```
## Permissão de execução para o arquivo activate:
### Windows:
```sh
Não necessita
```
### Linux/MacOS:
```sh
chmod +7 ./venv/bin/activate
```

## Ativar ambiente virtual, execução do arquivo activate:
### Windows:
```sh
source .\venv\Scripts\Activate
```
ou
```sh
.\venv\Scripts\Activate
```
### Linux/MacOS:
```sh
source ./venv/bin/activate
```

## Desativar ambiente virtual
### Windows:
```sh
deactivate
```
### Linux/MacOS:
```sh
deactivate
```
