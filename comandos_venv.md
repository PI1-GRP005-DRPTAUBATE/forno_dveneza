# Criando um ambiente virtual venv

## Criação do ambiente virtual: 
### Windows:
```sh
py -m venv %HOMEPATH%\project-path\venv
```
### Linux/MacOS:
```sh
python3 -m venv venv
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
source ~\project-path\Scripts\Activate
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