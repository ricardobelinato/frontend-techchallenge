# Tech Challenge - Plataforma de Blogging Dinâmico

Projeto desenvolvido como parte do Tech Challenge da FIAP, integrando conhecimentos adquiridos durante a fase 3.

## Descrição

Esta aplicação tem como objetivo fornecer uma plataforma centralizada e tecnológica onde professores da rede pública possam criar, editar e compartilhar conteúdos educacionais em formato de blog com seus alunos, promovendo inclusão digital e acesso ao conhecimento.

A aplicação foi refatorada utilizando React e Vite para possuir uma interface interativa com o usuário.

---

## Tecnologias Utilizadas

| Stack | Descrição |
|-------|-----------|
| **React** | Biblioteca JavaScript de código aberto |
| **Vite** | Ferramenta de construção e servidor de desenvolvimento |
| **Material UI** | Biblioteca de componentes React |
| **Tailwind CSS** | Framework CSS |
| **Docker** | Containerização da aplicação e banco |
| **NGINX** | Software de código aberto que funciona como servidor web|
| **GitHub Actions** | Pipeline de CI/CD |

---
## Como Executar o Projeto

Rodar o comando para executar o ```docker-compose.yml``` no aplicativo do backend  e seguir a devida documentação
https://github.com/RobertoDolife/techChallengeBackend/tree/main

### Instalar as dependências
```
npm install
```

### Executar a aplicação front end
```
npm run dev
```


---

## 📁 Estrutura de Pastas

```
|-- Dockerfile       
|-- README.md        
|-- eslint.config.js 
|-- index.html       
|-- nginx.conf       
|-- package-lock.json
|-- package.json     
|-- postcss.config.js
|-- public
|   |-- favicon.png  
|   `-- src
|       `-- assets   
|-- src
|   |-- App.test.tsx
|   |-- App.tsx
|   |-- assets
|   |   |-- logo.png
|   |   `-- logobg.png
|   |-- components
|   |   |-- Admin
|   |   |   `-- AdminPanel.tsx
|   |   |-- Banner
|   |   |   `-- Banner.tsx
|   |   |-- Login
|   |   |   `-- Login.tsx
|   |   |-- Navbar.tsx
|   |   |-- PopUp
|   |   |   |-- EditarPost.tsx
|   |   |   `-- VisualizarPost.tsx
|   |   |-- Student
|   |   |   |-- PostDetail.tsx
|   |   |   `-- StudentPanel.tsx
|   |   `-- Table
|   |       `-- TablePostAdmin.tsx
|   |-- config
|   |   `-- api.ts
|   |-- index.css
|   |-- main.tsx
|   `-- vite-env.d.ts
|-- tailwind.config.js
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
`-- vite.config.ts
```
--- 

## Desafios

- Entender e aplicar o uso da responsividade para diferentes telas.
- Ligação entre ambos projetos.
