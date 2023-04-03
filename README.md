# CRUD---Cadatro-Usuario
# Documentação da API


##  Principais Tecnologias

Visão geral do projeto, um pouco das tecnologias usadas.

-   [TypeScript](https://www.typescriptlang.org/)

-   [Express](https://expressjs.com/)

-   [Postgres](https://www.postgresql.org/)


##  Rodando o backend


###  Clone o projeto em sua máquina e instale as depêndencias da aplicação

no terminal deve chegar a pasta back do projeto
cd back
Execute o comando em seu terminal:
yarn

### Crie e preencha o arquivo .env

Crie um arquivo .env, seguindo como base o arquivo .env.example e preencha os dados de conexão com o banco de dados


###  Rode as migrations:

yarn typeorm migration:run -d src/data-source.ts


### Rodando o servidor localmente

Execute o comando em seu terminal:

yarn dev


##  Rodando o frontend


Deve primeiro rodar o backend
depois acessar no terminal a pasta contacts
com cd front depois contacts
Execute o comando em seu terminal:

yarn

yarn dev 

