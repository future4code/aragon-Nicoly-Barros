# Projeto Labenu System
- Projeto proposto para praticar programação orientada a objetos. 

## API - Postman
- link: https://documenter.getpostman.com/view/20786077/UzdxymCS

## Surge - Heroku
- link: https://labenu-system-nicoly.herokuapp.com/ping

## Autor
- gitHub: https://github.com/NicolyBarros

## Instalação das dependências
- npm install : Instala as dependências utilizadas no desenvolvimento do projeto.

## Criando e preenchenco arquivo .env
- Criar o arquivo .env e configurar com as informações de seu banco de dados.

PORT: 3003
DB_HOST = host
DB_USER = usuario
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados

## Popular tabelas
- npm run migrations: Cria e popula as tabelas no banco de dados com base no arquivo data.ts

## Executar o projeto
- npm run dev: Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor localhost toda a vez que o projeto for alterado e salvo.


## Funcionalidades básicas

### Endpoint 1) Cria turma
Requisição de criação de nova turma no sistema.

### Endpoint 2) Buscar turmas ativas
Requisição que pega todas as turmas ativas (turmas inativas estão no módulo 0).

### Endpoint 3) Mudar turma de módulo
Requisição que edita o módulo de uma turma do sistema.

### Endpoint 4) Criar estudante
Requisição de criação de novo estudante no sistema.

### Endpoint 5) Buscar estudantes a partir do seu nome
Requisição que retorna uma lista de estudantes filtrados por nome. Caso o filtro não seja enviado deve ser retornada a lista inteira de estudantes.

### Endpoint 6) Editar estudante de turma
Requisição que edita a turma que o estudante está matriculado.

### Endpoint 7) Exibir todas as pessoas pertencentes a uma turma
Requisição que busca todos estudantes que estão associados a uma turma. Exiba nessa lista apenas a id, name e email de cada estudante.
   