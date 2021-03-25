# NTask-API

Projeto criado a partir do livro "Construindo APIs REST com Node.js". Onde é criado uma API REST com `Node.js` e o framework web `Express`, para uma aplicação de gerencimanto de tarefas. A API foi implementada nas versões atuais dos frameworks, por isso está um pouco diferente do passo a passo do livro.

## Funcionalidades

- Listagem das tarefas;
- Consultar, cadastrar, excluir e alterar uma tarefa;
- Consultar, cadastrar e excluir um usuário;
- Autenticação de usuário;
- Página de documentação da API.

## Instalação

Será necessário instalar os pacotes das dependências da API, através do `npm`.

```
npm install
```

## Utilização

Para utilizar e realizar alguns testes da API será necessário executar o comando `npm star`, que será responsável em compilar o código ES6 e iniciar o sistema na porta 3000 ou 3443(HTTPS), por meio do comando `babel-node index.js`.

```
npm start
```

Em seu navegador, digite a seguinte url:

```
http://localhost:3000
```
```
https://localhost:3443
```

## Testes

Foi criado os testes dos endpoints da API, utilizando o `mocha` com `chai` e `supertest`, para realizar os testes, execute o seguinte comando:

```
npm test
```

## Documentação

A API foi documentada com a ferramenta `apiDoc`, que é um módulo do `Node.js` que por comentários padronizados no código, ele gera uma documentação.

```
http://localhost:3000/apidoc
```
```
https://localhost:3443/apidoc
```