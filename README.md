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

## Seeds

Seeds para utilizar com um software para gerenciar e administrar bancos de dados, como o ``` DBeaver ``` .

Seed para popular com usuários
```
-- seed-usuarios.sql
-- Popula tabela `usuario` com dados de teste

START TRANSACTION;

TRUNCATE TABLE `usuario`;

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `data_criacao`, `data_atualizacao`, `is_admin`) VALUES
(1, 'Roberto Silva', 'roberto.silva@example.com', 'senha123', '2025-09-01 10:12:00', '0000-00-00 00:00:00', 0),
(2, 'Maria Souza', 'maria.souza@example.com', 'senha123', '2025-09-05 14:30:00', '0000-00-00 00:00:00', 1),
(3, 'Ana Pereira', 'ana.pereira@example.com', 'senha123', '2025-08-22 09:05:00', '0000-00-00 00:00:00', 0),
(4, 'Carlos Oliveira', 'carlos.oliveira@example.com', 'senha123', '2025-07-11 16:20:00', '0000-00-00 00:00:00', 0),
(5, 'Mariana Costa', 'mariana.costa@example.com', 'senha123', '2025-09-10 08:45:00', '0000-00-00 00:00:00', 0),
(6, 'Felipe Almeida', 'felipe.almeida@example.com', 'senha123', '2025-06-30 12:00:00', '0000-00-00 00:00:00', 0),
(7, 'Juliana Rocha', 'juliana.rocha@example.com', 'senha123', '2025-09-12 21:10:00', '0000-00-00 00:00:00', 0),
(8, 'Pedro Santos', 'pedro.santos@example.com', 'senha123', '2025-05-03 11:25:00', '0000-00-00 00:00:00', 0),
(9, 'Larissa Ferreira', 'larissa.ferreira@example.com', 'senha123', '2025-09-15 13:00:00', '0000-00-00 00:00:00', 0),
(10, 'Gustavo Martins', 'gustavo.martins@example.com', 'senha123', '2025-04-18 07:40:00', '0000-00-00 00:00:00', 0),
(11, 'Beatriz Gomes', 'beatriz.gomes@example.com', 'senha123', '2025-09-18 19:22:00', '0000-00-00 00:00:00', 0),
(12, 'Rafael Almeida', 'rafael.almeida@example.com', 'senha123', '2025-03-29 15:55:00', '0000-00-00 00:00:00', 0),
(13, 'Patrícia Nunes', 'patricia.nunes@example.com', 'senha123', '2025-09-20 09:33:00', '0000-00-00 00:00:00', 0),
(14, 'André Ribeiro', 'andre.ribeiro@example.com', 'senha123', '2025-02-14 10:00:00', '0000-00-00 00:00:00', 0),
(15, 'Sofia Barros', 'sofia.barros@example.com', 'senha123', '2025-09-21 22:05:00', '0000-00-00 00:00:00', 0),
(16, 'Lucas Ferreira', 'lucas.ferreira@example.com', 'senha123', '2025-01-01 00:00:00', '0000-00-00 00:00:00', 0),
(17, 'Camila Pinto', 'camila.pinto@example.com', 'senha123', '2025-08-05 18:18:00', '0000-00-00 00:00:00', 0),
(18, 'Mateus Cardoso', 'mateus.cardoso@example.com', 'senha123', '2025-07-25 06:06:00', '0000-00-00 00:00:00', 0),
(19, 'Isabela Duarte', 'isabela.duarte@example.com', 'senha123', '2025-09-25 12:12:00', '0000-00-00 00:00:00', 0),
(20, 'Thiago Moreira', 'thiago.moreira@example.com', 'senha123', '2025-09-28 17:40:00', '0000-00-00 00:00:00', 0);

COMMIT;
```
Seed de posts

```
-- seed-posts.sql
-- Popula tabela `post` com dados de teste

START TRANSACTION;

TRUNCATE TABLE `post`;

INSERT INTO `post` (`id`, `titulo`, `materia`, `conteudo`, `data_criacao`, `imagem`, `data_atualizacao`, `usuario_id`) VALUES
(1, 'Introdução à Matemática', 'Matemática', 'Primeira aula sobre conceitos básicos de matemática, incluindo operações fundamentais.', '2025-09-01 09:00:00', 'matematica1.jpg', '2025-09-01 09:00:00', 1),
(2, 'História do Brasil - Período Colonial', 'Biologia', 'Resumo do início da colonização portuguesa e seus impactos.', '2025-09-02 10:30:00', 'historia1.jpg', '2025-09-02 10:30:00', 2),
(3, 'Introdução à Programação', 'Literatura', 'Conceitos básicos de algoritmos, variáveis e estruturas de controle.', '2025-09-03 11:00:00', 'programacao1.jpg', '2025-09-03 11:00:00', 3),
(4, 'Geografia - Relevo Brasileiro', 'História', 'Estudo dos principais tipos de relevo encontrados no Brasil.', '2025-09-04 14:00:00', 'geografia1.jpg', '2025-09-04 14:00:00', 4),
(5, 'Química - Ligações Químicas', 'Química', 'Explicação sobre ligações iônicas, covalentes e metálicas.', '2025-09-05 15:30:00', 'quimica1.jpg', '2025-09-05 15:30:00', 5),
(6, 'Física - Leis de Newton', 'Computação', 'Discussão sobre as três leis fundamentais do movimento.', '2025-09-06 16:45:00', 'fisica1.jpg', '2025-09-06 16:45:00', 6),
(7, 'Biologia - Célula Animal', 'Física', 'Aula introdutória sobre a estrutura e funções da célula animal.', '2025-09-07 09:20:00', 'biologia1.jpg', '2025-09-07 09:20:00', 7),
(8, 'Literatura - Modernismo', 'Português', 'Análise do movimento modernista no Brasil e seus principais autores.', '2025-09-08 13:10:00', 'literatura1.jpg', '2025-09-08 13:10:00', 8),
(9, 'Matemática - Álgebra Linear', 'Economia', 'Introdução a matrizes, determinantes e sistemas lineares.', '2025-09-09 10:40:00', 'matematica2.jpg', '2025-09-09 10:40:00', 9),
(10, 'História - Revolução Francesa', 'Artes', 'Contexto, causas e consequências da Revolução Francesa.', '2025-09-10 18:30:00', 'historia2.jpg', '2025-09-10 18:30:00', 10),
(11, 'Programação Web - HTML e CSS', 'Biologia', 'Primeiros passos na criação de páginas web com HTML e CSS.', '2025-09-11 11:15:00', 'web1.jpg', '2025-09-11 11:15:00', 11),
(12, 'Matemática - Funções', 'Matemática', 'Explicação sobre funções do 1º e 2º grau com exemplos.', '2025-09-12 09:50:00', 'matematica3.jpg', '2025-09-12 09:50:00', 12),
(13, 'Geografia - Climas do Brasil', 'Geografia', 'Estudo sobre os diferentes tipos de clima no território brasileiro.', '2025-09-13 14:25:00', 'geografia2.jpg', '2025-09-13 14:25:00', 13),
(14, 'Física - Eletricidade', 'Português', 'Noções básicas de corrente elétrica, resistência e potência.', '2025-09-14 16:00:00', 'fisica2.jpg', '2025-09-14 16:00:00', 14),
(15, 'Biologia - Fotossíntese', 'Computação', 'Processo de produção de energia pelas plantas através da luz solar', '2025-09-15 17:45:00', 'biologia2.jpg', '2025-10-04 03:41:44', 15);

COMMIT;
```
