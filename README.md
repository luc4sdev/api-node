## 💻 Routers App 

<h4>O projeto consiste em um back-end de uma aplicação de gerenciamento de clientes e roteadores. O projeto foi desenvolvido com Typescript, NodeJS e Fastify.
Para o banco de dados foi utilizada a orm do Prisma e o Elasticsearch para aramazenar os dados, foram realizados testes unitários e E2E, para a documentação da API foi utilizado o Swagger, foi feito o deploy do back-end no Render, onde a aplicação está funcional.</h4>


<br/>

## 📗 Link da documentação da API

<h2>Link: <a href="https://api-node-3q8n.onrender.com/docs" target="_blank" rel="external">Documentação</a></h2>

<br/>
<br/>

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você tem uma máquina `<Windows / Linux / Mac>`
* Você instalou a versão mais recente do `NodeJS`

<br/>


## ⚙️ Instalando

Para instalar execute no terminal:

npm:
```
npm i
```

yarn:
```
yarn install
```

pnpm:
```
pnpm i
```

<br/>

## 🚀 Rodando o projeto

Para rodar o projeto, execute no terminal:

npm:
```
npm run dev
```
yarn:
```
yarn dev
```

pnpm:
```
pnpm run dev
```

<br/>


## 🧪 Rodando os testes

Foram realizados testes unitários e testes E2E, utilizando o vitest, para rodar os testes digite o seguinte comando no terminal:

npm:
```
npm run test
```
yarn:
```
yarn test
```

pnpm:
```
pnpm run test
```

<br/>

## 🚀 Tecnologias utilizadas

O projeto está desenvolvido utilizando as seguintes tecnologias:

- Typescript <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
- NodeJS <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
- Fastify <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg" />
- Prisma <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" />
- Elasticsearch <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg" />
- PostgreSQL <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
- Vitest <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg" />
- Swagger <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" />






## Features

### Clientes

- ✅ Um cliente está ativo somente quando está vinculado a um roteador.
- ✅ Um cliente está vinculado apenas a 1 roteador.

### Roteadores

- ✅ Um roteador está ativo somente quando está vinculado a pelo menos um cliente.
- ✅ Um roteador pode ter vários clientes cadastrados.

### Endereços

- ✅ Um endereço pode ter vários clientes.
