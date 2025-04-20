# frontend-clinica-pdw-ceub

Este projeto é o frontend de um sistema criado para a realização do "Projeto 04" do trabalho de sistematização da matéria de Programação e Desenvolvimento Web no curso de Análise e Desenvolvimento de Sistemas (EAD) da UniCEUB.

## Características

O projeto foi criado em Node 20, utilizando o framework Angular. Para executá-lo, é necessário executar o [backend](https://github.com/GuiTav/backend-clinica-pdw-ceub) previamente.

## Execução

*Para executar em modo de desenvolvimento, é necessário a instalação do Node 20 na máquina.*
*Para executar pelo Docker, é necessária a instalação e configuração básica do Docker*

Primeiramente, clone o projeto [backend](https://github.com/GuiTav/backend-clinica-pdw-ceub) para a sua máquina e execute o passo a passo presente no README.md, de acordo com o modo de execução desejado (desenvolvimento ou Docker). Após isso, execute os comandos abaixo

Após a subida do projeto, será possível acessar a página http://localhost:4200 e interagir com a aplicação.

### Modo desenvolvimento

```
npm install
npm start
```

Aguarde até ver logs parecidos com este para acessar a página inicial:

```
Application bundle generation complete. [9.376 seconds]

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
```

### Modo Docker

```
docker build -t frontend-clinica-pdw-ceub:latest .
docker run -p 4200:80 frontend-clinica-pdw-ceub:latest
```

Aguarde até ver logs parecidos com este para acessar a página inicial:

```
2025/04/20 17:52:20 [notice] 1#1: start worker process 28
2025/04/20 17:52:20 [notice] 1#1: start worker process 29
2025/04/20 17:52:20 [notice] 1#1: start worker process 30
2025/04/20 17:52:20 [notice] 1#1: start worker process 31
```
