# Agenda ConectSe

Projeto Full-stack - Cadastro e consulta de clientes com vínculo de contatos. Layout responsivo

## Tecnologias Utilizadas

### Front-End - React.js
- Typescript
- Tailwind CSS com responsividade
- react-router-dom v6
- Hook Form
- Validações com Yup
- Context
- Modais e toast com Chakra-ui
- Acesso a API com axios
- react-pdf para gerar relatório em PDF
- React-icons

### Back-End
- Framework Express
- TypeORM
- PostgreSQL
- JsonWebToken
- Encriptação de senha com bcryptjs
- Documentação feita com Swagger e arquivos .yml
- Middlewares para autenticação e tratamento de erros

## Instalação

Faça o clone do repositório:

```
git clone git@github.com:cirocativo/agenda-conectese.git
```

### Front-End

#### Entre na pasta, Instale os pacotes e inicie a aplicação

```
cd agenda-conectese/front-end
yarn install
yarn start
```

### Back-End

#### 1. Entre na pasta e Instale os pacotes

```
cd agenda-conectese/back-end
yarn install
```

#### 2. Crie o arquivo .env e preencha com as informações do seu banco de dados local (Postgres), conforme o arquivo .env.example

#### 3. Rode as migrations

Execute o comando responsável por rodar as migrations e criar as tabelas no seu banco de dados:

```
yarn typeorm migration:run -d src/data-source.ts
```

#### 4. Inicie o servidor

```
yarn dev
```

## Funcionamento

### Front-End

- Interface simples e intuitiva, possui quatro páginas: Login, Register, Dashboard, e UserPdf:
  - "/" -> Dashboard
  - "/login" -> Tela de Login
  - "/register" -> Tela de cadastro de novo usuário
  - "/pdf" -> Tela de visualização do relatório de todos os contatos
- A página de Dashboard (principal) é acessível apenas depois de estar logado, senão é redirecionado para a página de Login.
- Na Dashboard, é possível:
  - Visualizar lista de contatos. Para cada contato, pode-se alterar ou excluir
  - Criar novo contato
  - Editar/Excluir conta
  - Sair para tela de Login
- A página UserPdf mostra um relatório simples de todos os contatos em PDF, onde é possível também fazer o download

### Back-End

Toda a documentação está no endpoint "/docs", toda feita através da API Swagger:

http://localhost:3000/docs

Todos os endpoints:

POST
/contacts

GET
/contacts

PATCH
/contacts/{contactId}

DELETE
/contacts/{contactId}

----------------------
POST
/login

----------------------
POST
/users

GET
/users

PATCH
/users

DELETE
/users

GET
/users/profile


