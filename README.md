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
| **GitHub Actions** | Pipeline de CI/CD |

---
## Como Executar o Projeto

Rodar o aplicativo do backend seguindo a devida documentação
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
|-- README.md
|-- eslint.config.js
|-- index.html
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

Entender e aplicar o uso da responsividade para diferentes telas.
