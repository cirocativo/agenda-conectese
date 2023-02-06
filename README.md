# cadastro-de-clientes
Projeto Full-stack - Cadastro e consulta de clientes com vínculo de contatos

## Tecnologias Utilizadas

### Front-End - React.js
- Typescript
- Estilização com Tailwind CSS
- Rotas protegidas com react-router-dom v6
- Hook Form
- Validações com Yup
- Dados globais com Context
- Modais e toast com Chakra-ui
- Acesso a API com axios
- React-icons

### Back-End
- Framework Express
- Entidades com TypeORM
- Banco de Dados com PostgreSQL
- Encriptação de senha com bcryptjs
- jswebtoken
- Middlewares para autenticação e tratamento de erros

## Instalação

Faça o clone do repositório:

` git clone git@github.com:cirocativo/agenda-conectese.git`

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

#### 3. Inicie o servidor

`yarn dev`

