# Tarefas usando Git

### Fluxo de trabalho para baixar o repositório, criar nova brach e fazer a sincronização com o Github
#### Obs.: as chaves indicam onde devem ser colocadas as informações, sem as chaves.
#### Obs.: para o gerenciamento remoto é preciso ter o acesso remoto configurado no Github.

### Baixar repositório
```sh
git clone {url repo remoto}
```

### Fazer a ligação entre o repositório local e o repositório remoto
#### origin é o nome padrão pro repositório remoto, podendo ser alterado
```sh
git remote add origin {url repo remoto}
```

### Criar uma nova branch local
```sh
git checkout -b {nome da nova branch}
```

### Subir a branch local para o repositório remoto pela primeira vez
```sh
git push -u origin {nome da branch}
```

### Subir alterações locais para o repositório remoto
```sh
git push
```
