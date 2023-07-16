
# Dashboard Influencers



## 💻 Sobre o projeto

📲 Influencers Dashboard - é um projeto que visa desenvolver um painel de controle completo para gerenciamento de influenciadores. O Influencers Dashboard oferece uma solução centralizada para empresas e marcas que desejam acompanhar, interagir e gerenciar suas parcerias com influenciadores de forma eficaz.




---

## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
 1. [BackEnd](https://github.com/gsantos20/api-influencers.git)  - [API](https://api-influencers-gsantos20.vercel.app/)
 2. [FrontEnd](https://github.com/gsantos20/dashboard-influencers.git) - [Web](https://api-influencers-gsantos20.vercel.app/)

💡 Tanto o Frontend precisam que o Backend esteja sendo executado para funcionar.


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)


### Configurações local

#### 🎲 Rodando o Backend ( API )

Para rodar a API , você vai precisar adicionar as seguintes variáveis de ambiente no seu .env, o modelo esta no arquivo .env.example

`MONGODB_URL` - Url de acesso do banco de dados mongo db.

#### Exemplo : mongodb+srv://cluster0.example.mongodb.net

`MONGODB_USERNAME` - Usuario para acesso a base de dados

#### Exemplo : user_example 

`MONGODB_PASSWORD` - Senha do usuario para acesso a base de dados

#### Exemplo : password_example

`SECRET_JWT` - Token gerado aleatoriamente para autenticação

#### Exemplo : puxTF6gyKQ00VQyWZCGjyWGosxCD4vSo


#### Executando a aplicação

```bash

# Clone este repositório
$ git clone git@github.com:gsantos20/api-influencers.git

# Acesse a pasta do projeto no terminal/cmd
$ cd api-influencers

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000 
```

#### 🧭 Rodando a aplicação web (Frontend)

Para rodar a API , você vai precisar adicionar as seguintes variáveis de ambiente no seu environment.development.ts , o modelo esta no arquivo environment.development.example.ts

`production` - Define se a aplicação esta rodando em produção

#### Exemplo : { production: false, ...outrosArgs }

`apiURL` - Url de acesso da sua api

#### Exemplo : { apiURL: "http://localhost:3000/api/v1", ...outrosArgs } 

#### Executando a aplicação

```bash

# Clone este repositório
$ git clone git@github.com:gsantos20/dashboard-influencers.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd dashboard-influencers

# Instale o framework angular
$ npm install -g @angular/cli

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:4000 - acesse http://localhost:4000

```


#### 🔒  Iniciar Testes

```bash
# No Terminal use os seguintes comandos

npm run test
```

#### ⚙ Build do Projeto


```bash
# No Terminal use os seguintes comandos

npm build

node dist/server.js
```


## 📖 Documentação da API


 - #### Usuarios

```http
  GET /api/v1/users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Username` | `string` | Nome de usuario unico |
| `Email` | `string` | Email do usuario |
| `FirstName` | `string` | Nome do Usuario |
| `LastName` | `string` | Sobrenome do Usuario |

 Retorna um JSON de usuarios de acordo com os parametros.

### 

```http
  POST /api/v1/user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Username` | `string` | **Obrigatório**. Nome de usuario unico |
| `Password` | `string` | **Obrigatório**. Senha do usuario |
| `Email` | `string` | **Obrigatório**. Email do Usuario |
| `FirstName` | `string` | **Obrigatório**. Nome do Usuario |
| `LastName` | `string` | **Obrigatório**. Sobrenome do Usuario |

Retorna um JSON com o usuario cadastrado.

### 

```http
  POST /api/v1/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Username` | `string` | **Obrigatório**. Nome de usuario unico |
| `Password` | `string` | **Obrigatório**. Senha do usuario |

Retorna um objeto com um token de login do usuario.

### 

```http
  DELETE /api/v1/user/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Identificador do influenciador |      
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Deleta um usuario de acordo com o id.

### 

 - #### Influenciadores

```http
  GET /api/v1/influencers
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `firstName`      | `string` | Nome do influenciador |
| `lastName`      | `string` | Sobrenome do influenciador |
| `email`      | `string` | email do influenciador |
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Retorna um JSON de influenciadores de acordo com os parametros.

### 

```http
  PATCH /api/v1/influencer/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Identificador do influenciador |      
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Atualiza um influenciador de acordo com o id.

### 

```http
  DELETE /api/v1/influencer/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Identificador do influenciador |      
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Deleta um influenciador de acordo com o id.



## 🏗 Arquitetura

 * #### Users

![Users](https://i.imgur.com/Iz2ro83.png)

 * #### Influencers

![Influencers](https://i.imgur.com/7hYVHJl.png)



## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Backend API**  ([Node.js](https://nodejs.org/en)  +  [TypeScript](https://www.typescriptlang.org/) + [Express](https://expressjs.com/pt-br/) + [MongoDB](https://www.mongodb.com/))

-   **[Bcryptjs](https://www.npmjs.com/package/bcryptjs)**
-   **[Cors](https://www.npmjs.com/package/cors)**
-   **[DotEnv](https://www.npmjs.com/package/dotenv)**
-   **[Express Async Erros](https://www.npmjs.com/package/express-async-errors)**
-   **[Express Body Parser Error Handler](https://www.npmjs.com/package/express-body-parser-error-handler)**
-   **[Json Web Token](https://jwt.io/)**
-   **[Lodash](https://lodash.com/)**
-   **[Uuid](https://www.npmjs.com/package/uuid)**
-   **[Validator](https://www.npmjs.com/package/validator)**


> Veja o arquivo  [package.json](https://github.com/gsantos20/api-dashboard/blob/main/package.json)

#### **Frontend Web**  ([Angular](https://angular.io/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Angular Material](https://material.angular.io/)**
-   **[Bootstrap](https://getbootstrap.com/)**
-   **[Bootstrap Icons](https://icons.getbootstrap.com/)**
-   **[Bootstrap Select](https://www.npmjs.com/package/bootstrap-select)**
-   **[Bootswatch](https://bootswatch.com/)**
-   **[Font Awesome](https://fontawesome.com/icons)**
-   **[Jquery](https://www.npmjs.com/package/jquery)**
-   **[Lodash](https://lodash.com/)**
-   **[Moment](https://momentjs.com/)**
-   **[Ngx Bootstrap](https://www.npmjs.com/package/ngx-bootstrap)**
-   **[Ngx Bootstrap Icons](https://www.npmjs.com/package/ngx-bootstrap-icons)**
-   **[Ngx Mask](https://www.npmjs.com/package/ngx-mask)**
-   **[Ngx Select Dropdown](https://www.npmjs.com/package/ngx-select-dropdown)**
-   **[Ngx Select Ex](https://www.npmjs.com/package/ngx-select-ex)**
-   **[Ngx Spinner](https://www.npmjs.com/package/ngx-spinner)**
-   **[Ngx Toastr](https://www.npmjs.com/package/ngx-toastr)**
-   **[RxJs](https://rxjs.dev/)**
-   **[Sweetalert2](https://sweetalert2.github.io/)**
-   **[Tslib](https://www.npmjs.com/package/tslib)**
-   **[Zone.js](https://www.npmjs.com/package/zone.js)**
-   **[Eslint && Plugins](https://eslint.org/)**
-   **[Prettier && Plugins](https://prettier.io/)**

> Veja o arquivo  [package.json](https://github.com/gsantos20/influencers-dashboard/blob/main/package.json)

## 🧾 Conceitos utilizados

- SOLID
- Injeção de Dependência (Dependency Injection)
- Repository Pattern
- Service Pattern
## 🦸 Autor

<div>
 <img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/100292023?s=460&u=61b426b901b8fe02e12019b1fdb67bf0072d4f00&v=4" width="100px;" alt=""/>
   <br />
 <sub><b>Gustavo Santos</b></sub></a> <a href="https://www.linkedin.com/in/gsantos20">🚀</a>
</div>
 <br />

<div>
  <a href="https://instagram.com/guuztta" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
  <a href ="mailto:nerisgs20@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/gsantos20" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
</div>

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Gustavo Santos 👋🏽 [Entre em contato!](https://www.linkedin.com/in/gsantos20/)

---
